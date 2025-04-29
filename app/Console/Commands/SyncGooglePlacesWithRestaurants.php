<?php

namespace App\Console\Commands;

use App\Enums\City;
use App\Jobs\PerformGooglePlacesNearbySearchRequestJob;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as SymfonyCommand;

class SyncGooglePlacesWithRestaurants extends Command
{
    private const SEARCH_RADIUS = 250;

    /**
     * @var string
     */
    protected $signature = 'app:sync-google-places-with-restaurants {--city=}';
    public function handle(): int
    {
        $city = City::tryFrom($this->option('city'));

        if ($city === null) {
            $this->error('Invalid city option provided.');
            return SymfonyCommand::FAILURE;
        }

        [$north, $south, $west, $east] = $city->coordinates();
        $deltaLat = round(self::SEARCH_RADIUS / 111_000, 4);

        for ($lat = $south; $lat <= $north; $lat += $deltaLat) {
            $deltaLng = $deltaLat / cos(deg2rad($lat));

            for ($lng = $west; $lng <= $east; $lng += $deltaLng) {
                PerformGooglePlacesNearbySearchRequestJob::dispatch($lat, $lng, self::SEARCH_RADIUS, $city)
                    ->delay(10);
            }
        }

        return self::SUCCESS;
    }
}
