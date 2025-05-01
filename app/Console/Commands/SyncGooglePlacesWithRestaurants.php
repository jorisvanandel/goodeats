<?php

namespace App\Console\Commands;

use App\Enums\City;
use App\Jobs\PerformGooglePlacesNearbySearchRequestJob;
use App\Models\Pivot\Engagement;
use App\Models\Restaurant;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as SymfonyCommand;

class SyncGooglePlacesWithRestaurants extends Command
{
    private const SEARCH_RADIUS = 250;

    /**
     * @var string
     */
    protected $signature = 'app:sync-google-places-with-restaurants {--city=} {--flush}';

    public function handle(): int
    {
        $city = City::tryFrom($this->option('city'));

        if ($city === null) {
            $this->error('Invalid city option provided.');

            return SymfonyCommand::FAILURE;
        }

        [$north, $south, $west, $east] = $city->coordinates();
        $deltaLat = round(self::SEARCH_RADIUS / 111_000, 4);

        $requestCnt = 1;

        if ($this->option('flush')) {
            Engagement::query()->delete();
            Restaurant::query()->delete();
        }

        for ($lat = $south; $lat <= $north; $lat += $deltaLat) {
            $deltaLng = $deltaLat / cos(deg2rad($lat));

            for ($lng = $west; $lng <= $east; $lng += $deltaLng) {
                PerformGooglePlacesNearbySearchRequestJob::dispatch($lat, $lng, self::SEARCH_RADIUS, $city)
                    ->delay($requestCnt * 10);

                $requestCnt++;
            }
        }

        return self::SUCCESS;
    }
}
