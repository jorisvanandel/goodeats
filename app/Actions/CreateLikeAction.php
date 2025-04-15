<?php

declare(strict_types=1);

namespace App\Actions;

use App\Exceptions\CannotLikeRestaurantException;
use App\Models\Restaurant;
use App\Models\User;

class CreateLikeAction
{
    /**
     * @throws CannotLikeRestaurantException
     */
    public function execute(Restaurant $restaurant, User $user): void
    {
        if ($user->likes()->where('restaurant_id', $restaurant->id)->exists()) {
            throw CannotLikeRestaurantException::becauseUserAlreadyLikedIt();
        }

        $user->likes()->attach($restaurant);
    }
}
