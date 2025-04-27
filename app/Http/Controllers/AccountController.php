<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{

    public function __invoke(#[CurrentUser] User $user): Response
    {
        $followers = $user->followers()->paginate(10);
        $followings = $user->followings()->paginate(10);

        return Inertia::render('account', [
            'user'        => UserResource::make($user),
            'followers'   => UserResource::collection($followers),
            'followings'  => UserResource::collection($followings),
        ]);
    }
}
