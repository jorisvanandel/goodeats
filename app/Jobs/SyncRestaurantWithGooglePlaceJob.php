<?php

namespace App\Jobs;

use App\Connectors\GooglePlacesApiConnector;
use App\Enums\City;
use App\Models\Restaurant;
use App\Requests\GooglePlacesNearbySearchRequest;
use App\Requests\GooglePlacesPhotoRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Saloon\Exceptions\Request\FatalRequestException;
use Saloon\Exceptions\Request\RequestException;
use Saloon\Exceptions\SaloonException;

class SyncRestaurantWithGooglePlaceJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly array $data,
        private readonly City $city,
    ) {

    }

    public function handle(): void
    {
        $restaurant = Restaurant::query()->updateOrCreate([
            'google_places_id' => $this->data['id'],
        ], [
            'name' => $this->data['displayName']['text'],
            'city' => $this->city,
            'address' => $this->data['formattedAddress']
        ]);

        // @TODO: Probably at some point we should sync images as well instead of only adding initial sync.
        if (!$restaurant->wasRecentlyCreated) {
            return;
        }

        $connector = app(GooglePlacesApiConnector::class);

        foreach (array_slice($this->data['photos'], 0, 5) as $photo) {
            try {
                $response = $connector->send(new GooglePlacesPhotoRequest($photo['name']));
            } catch (\Exception $e) {
                report($e);
                continue;
            }

            $restaurant->addMediaFromUrl($response->json('photoUri'))
                ->toMediaCollection('images');
        }
    }
}
