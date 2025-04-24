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
//        private readonly float $latitude,
//        private readonly float $longitude,
    )
    {
    }

    public function resolveEndpoint(): string
    {
        return '/places:searchNearby';
    }

    protected function defaultHeaders(): array
    {
        return [
            'X-Goog-FieldMask' => 'places.id,places.displayName,places.formattedAddress,places.photos',
            'X-Goog-Api-Key' => config('services.google.api_key'),
        ];
    }

    protected function defaultBody(): array
    {
        return [
            'includedTypes' => ['fine_dining_restaurant'],
            'locationRestriction' => [
                'circle' => [
                    'center' => [
                        'latitude' => '52.379189',
                        'longitude' => '4.899431',
                    ],
                    'radius' => 1000,
                ],
            ]
        ];
    }
}
