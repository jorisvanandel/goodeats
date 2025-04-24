<?php

namespace App\Console\Commands;

use App\Connectors\GooglePlacesApiConnector;
use App\Enums\City;
use App\Models\Restaurant;
use App\Requests\GooglePlacesPhotoRequest;
use App\Requests\GooglePlacesNearbySearchRequest;
use Illuminate\Console\Command;
use JsonException;
use Saloon\Exceptions\SaloonException;
use Throwable;

class SyncGooglePlacesWithRestaurants extends Command
{
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

        try {
            $placesResponse = $this->connector->send(new GooglePlacesNearbySearchRequest());

            foreach ($placesResponse->json('places') ?? [] as $place) {
                $restaurant = Restaurant::query()->updateOrCreate([
                    'google_places_id' => $place['id'],
                ], [
                    'name' => $place['displayName']['text'],
                    'city' => $city,
                    'address' => $place['formattedAddress']
                ]);

                foreach (array_slice($place['photos'], 0, 5) as $photo) {
                    $response = $this->connector->send(new GooglePlacesPhotoRequest($photo['name']));

                    $restaurant->addMediaFromUrl($response->json('photoUri'))
                        ->toMediaCollection('images');
                }
            }
        } catch (SaloonException $e) {
            dd($e);
        } catch (Throwable $e) {
            dd($e);
        }

        return self::SUCCESS;
    }
}
