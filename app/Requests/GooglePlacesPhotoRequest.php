<?php

declare(strict_types=1);

namespace App\Requests;

use Saloon\Enums\Method;
use Saloon\Http\Request;

class GooglePlacesPhotoRequest extends Request
{
    public function __construct(
        private readonly string $photoName
    )
    {
    }

    protected Method $method = Method::GET;

    public function resolveEndpoint(): string
    {
        return sprintf('/%s/media', $this->photoName);
    }

    protected function defaultQuery(): array
    {
        return [
            'key' => config('services.google.api_key'),
            'maxHeightPx' => 800,
            'skipHttpRedirect' => true,
        ];
    }
}
