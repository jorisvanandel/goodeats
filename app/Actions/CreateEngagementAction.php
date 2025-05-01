<?php

declare(strict_types=1);

namespace App\Actions;

use App\Enums\EngagementType;
use App\Exceptions\CannotCreateEngagementException;
use App\Models\Restaurant;
use App\Models\User;

class CreateEngagementAction
{
    /**
     * @throws CannotCreateEngagementException
     */
    public function execute(Restaurant $restaurant, User $user, EngagementType $type, ?int $rating = null): void
    {
        if ($user->engagements()->where('restaurant_id', $restaurant->id)->where('type', $type)->exists()) {
            throw CannotCreateEngagementException::becauseUserAlreadyHasEngagement();
        }

        $user->engagements()->attach($restaurant, [
            'type' => $type,
            'rating' => $rating,
        ]);
    }
}
