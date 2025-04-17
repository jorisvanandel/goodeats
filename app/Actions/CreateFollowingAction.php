<?php

declare(strict_types=1);

namespace App\Actions;

use App\Exceptions\CannotFollowUserException;
use App\Models\User;

class CreateFollowingAction
{
    /**
     * @throws CannotFollowUserException
     */
    public function execute(User $follower, User $following): void
    {
        if ($follower->followings()->where('following_id', $follower->id)->exists()) {
            throw CannotFollowUserException::becauseUserIsAlreadyFollowed();
        }

        if ($follower->is($following)) {
            throw CannotFollowUserException::becauseUserCannotFollowItself();
        }

        $follower->followings()->attach($following);
    }
}
