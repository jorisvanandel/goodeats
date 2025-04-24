<?php

declare(strict_types=1);

namespace App\Connectors;

use Saloon\Http\Connector;

class GooglePlacesApiConnector extends Connector
{
    public function resolveBaseUrl(): string
    {
        return 'https://places.googleapis.com/v1';
    }

    protected function defaultHeaders(): array
    {
        return [
            'Accept' => 'application/json',
        ];
    }
}
