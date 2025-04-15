<?php

declare(strict_types=1);

namespace App\Exceptions;

use RuntimeException;

class CannotLikeRestaurantException extends RuntimeException
{
    public static function becauseUserAlreadyLikedIt(): self
    {
        return new self('Cannot like restaurant because the user already liked it.');
    }
}
