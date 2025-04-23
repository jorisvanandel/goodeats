<?php

declare(strict_types=1);

namespace App\Actions;

use App\Enums\EngagementType;
use App\Models\Restaurant;
use App\Models\User;

class RemoveEngagementAction
{
    public function execute(Restaurant $restaurant, User $user, EngagementType $type): void
    {
        $user->engagements()
            ->wherePivot('type', $type)
            ->detach($restaurant);
    }
}
