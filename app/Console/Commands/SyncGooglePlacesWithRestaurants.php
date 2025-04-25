<?php

namespace App\Console\Commands;

use App\Connectors\GooglePlacesApiConnector;
use App\Enums\City;
use App\Models\Restaurant;
use App\Requests\GooglePlacesNearbySearchRequest;
use App\Requests\GooglePlacesPhotoRequest;
use Illuminate\Console\Command;
use Saloon\Exceptions\SaloonException;

class SyncGooglePlacesWithRestaurants extends Command
{
    private const SEARCH_RADIUS = 1000;

    /**
     * @var string
     */
    protected $signature = 'app:sync-google-places-with-restaurants {--city=}';

    public function __construct(
        private readonly GooglePlacesApiConnector $connector
    )
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $city = City::tryFrom($this->option('city'));

        if ($city === null) {
            $this->error('Invalid city option provided.');
            return Command::FAILURE;
        }

        [$north, $south, $west, $east] = $city->coordinates();
        $uniquePlaces = [];
        $deltaLat = round(self::SEARCH_RADIUS / 111_000, 4);

        $requestCnt = 0;

        for ($lat = $south; $lat <= $north; $lat += $deltaLat) {
            $deltaLng = $deltaLat / cos(deg2rad($lat));

            for ($lng = $west; $lng <= $east; $lng += $deltaLng) {
                sleep(5);
                $this->info('Making request...');

                $requestCnt++;
//                continue;
                try {
                    $placesResponse = $this->connector->send(
                        new GooglePlacesNearbySearchRequest(latitude: $lat, longitude: $lng, radius: self::SEARCH_RADIUS)
                    );
                } catch (SaloonException $e) {
                    dd($e);
                }

                try {
                    $places = $placesResponse->json('places') ?? [];
                } catch (\JsonException $e) {
                    dd($placesResponse);
                }

                if (count($places) === 20) {
                    $this->error('More than 20 places found. Exiting...');
//                    return Command::FAILURE;
                } else {
                    $this->info(sprintf('Found %s places.', count($places)));
                }

                foreach ($places as $place) {
                    if (array_key_exists($place['id'], $uniquePlaces)) {
                        $this->warn('Duplicate place, continueing...');
                        continue;
                    }

                    $uniquePlaces[$place['id']] = $place;
                }
            }
        }
//        dd($requestCnt);

        foreach ($uniquePlaces as $place) {
            $restaurant = Restaurant::query()->updateOrCreate([
                'google_places_id' => $place['id'],
            ], [
                'name' => $place['displayName']['text'],
                'city' => $city,
                'address' => $place['formattedAddress']
            ]);

            // @TODO: Probably at some point we should sync images as well instead of only adding initial sync.
            if (!$restaurant->wasRecentlyCreated) {
                continue;
            }

            foreach (array_slice($place['photos'], 0, 5) as $photo) {
                $response = $this->connector->send(new GooglePlacesPhotoRequest($photo['name']));

                $restaurant->addMediaFromUrl($response->json('photoUri'))
                    ->toMediaCollection('images');
            }
        }

        return self::SUCCESS;
    }
}
