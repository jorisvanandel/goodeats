<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Restaurant;
use App\Models\User;

class RemoveLikeAction
{
    public function execute(Restaurant $restaurant, User $user): void
    {
        $user->likes()->detach($restaurant);
    }
}
