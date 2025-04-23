<?php

declare(strict_types=1);

namespace App\Exceptions;

use RuntimeException;

class CannotCreateEngagementException extends RuntimeException
{
    public static function becauseUserAlreadyHasEngagement(): self
    {
        return new self();
    }
}
