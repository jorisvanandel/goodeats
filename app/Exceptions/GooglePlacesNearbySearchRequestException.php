<?php

declare(strict_types=1);

namespace App\Exceptions;

use RuntimeException;

class GooglePlacesNearbySearchRequestException extends RuntimeException
{
    public function __construct(string $message)
    {
        parent::__construct($message);
    }
}
