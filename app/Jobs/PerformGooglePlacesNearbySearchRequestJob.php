<?php

namespace App\Jobs;

use App\Connectors\GooglePlacesApiConnector;
use App\Enums\City;
use App\Requests\GooglePlacesNearbySearchRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Saloon\Exceptions\SaloonException;

class PerformGooglePlacesNearbySearchRequestJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly float $latitude,
        private readonly float $longitude,
        private readonly int $radius,
        private readonly City $city,
    ) {

    }

    public function handle(): void
    {
        $connector = app(GooglePlacesApiConnector::class);

        try {
            $request = new GooglePlacesNearbySearchRequest($this->latitude, $this->longitude, $this->radius);
            $placesResponse = $connector->send($request);
        } catch (SaloonException $e) {
            if ($e->getCode() === 502) {
                $this->release($e);
            } else {
                $this->fail($e);
            }
            return;
        }

        try {
            $places = $placesResponse->json('places') ?? [];

            if (count($places) === 20) {
                $this->fail('More than 20 places found. Search radius should be narrowed.');
            }

            foreach ($places as $place) {
                SyncRestaurantWithGooglePlaceJob::dispatch($place, $this->city);
            }
        } catch (\JsonException) {
            $this->fail('Exception caught when trying to access json from places response.');
        }
    }
}
