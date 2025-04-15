<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function __invoke(#[CurrentUser] User $user): Response
    {
        $restaurants = $user->likes()->paginate(10);

        return Inertia::render('account', [
            'user' => UserResource::make($user),
            'likes' => RestaurantResource::collection($restaurants)
        ]);
    }
}
