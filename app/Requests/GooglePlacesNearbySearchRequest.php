<?php

declare(strict_types=1);

namespace App\Requests;

use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Http\Request;
use Saloon\Traits\Body\HasJsonBody;

class GooglePlacesNearbySearchRequest extends Request implements HasBody
{
    use HasJsonBody;

    protected Method $method = Method::POST;

    public function __construct(
        private readonly float $latitude,
        private readonly float $longitude,
        private readonly int $radius
    ) {}

    public function resolveEndpoint(): string
    {
        return '/places:searchNearby';
    }

    protected function defaultHeaders(): array
    {
        return [
            'X-Goog-FieldMask' => 'places.id,places.displayName,places.shortFormattedAddress,places.types,places.photos',
            'X-Goog-Api-Key' => config('services.google.api_key'),
        ];
    }

    protected function defaultBody(): array
    {
        return [
            'includedPrimaryTypes' => ['restaurant'],
            'includedTypes' => ['diner'],
            'excludedTypes' => [
                'sandwich_shop',
                'breakfast_restaurant',
                'brunch_restaurant',
                'breakfast_restaurant',
                'fast_food_restaurant',
                'store',
                'food_store',
                'bakery',
                'wholesaler',
                'cafe',
                'pub',
                'bar',
                'meal_takeaway',
                'meal_delivery',
            ],
            'locationRestriction' => [
                'circle' => [
                    'center' => [
                        'latitude' => (string) round($this->latitude, 4),
                        'longitude' => (string) round($this->longitude, 4),
                    ],
                    'radius' => $this->radius,
                ],
            ],
        ];
    }
}
