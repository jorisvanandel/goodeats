<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SearchRestaurantsRequest;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\UserResource;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class ViewProfileController extends Controller
{
    public function __invoke(User $user, #[CurrentUser] User $currentUser): Response
    {
        $user->load('likes');

        $restaurants = $user->likes()->paginate(10);

        return Inertia::render('profile', [
            'likes_count' => $user->likes()->count(),
            'likes'       => RestaurantResource::collection($restaurants),
            'user'        => UserResource::make($user),
            'following'   => $currentUser ? $currentUser->follows($user) : null
        ]);
    }
}
