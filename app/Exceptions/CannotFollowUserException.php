<?php

declare(strict_types=1);

namespace App\Exceptions;

use RuntimeException;

class CannotFollowUserException extends RuntimeException
{
    public static function becauseUserIsAlreadyFollowed(): self
    {
        return new self;
    }

    public static function becauseUserCannotFollowItself(): self
    {
        return new self;
    }
}
