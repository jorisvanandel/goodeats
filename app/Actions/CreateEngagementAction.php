<?php

declare(strict_types=1);

namespace App\Actions;

use App\Enums\EngagementType;
use App\Exceptions\CannotLikeRestaurantException;
use App\Models\Restaurant;
use App\Models\User;

class CreateEngagementAction
{
    /**
     * @throws CannotLikeRestaurantException
     */
    public function execute(Restaurant $restaurant, User $user, EngagementType $type): void
    {
        if ($user->engagements()->where('restaurant_id', $restaurant->id)->exists()) {
            throw CannotLikeRestaurantException::becauseUserAlreadyLikedIt();
        }

        $user->engagements()->attach($restaurant, [
            'type' => $type,
        ]);
    }
}
