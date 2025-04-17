<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\User;

class RemoveFollowingAction
{
    public function execute(User $follower, User $following): void
    {
        $follower->followings()->detach($following);
    }
}
