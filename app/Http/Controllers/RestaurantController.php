<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantController extends Controller
{
    public function show(Restaurant $restaurant, #[CurrentUser] User $user): Response
    {
        $restaurant->load('media');

        return Inertia::render('restaurant', [
            'restaurant' => RestaurantResource::make($restaurant),
            'visited' => $user->hasVisitedRestaurant($restaurant),
            'bookmarked' => $user->hasBookmarkedRestaurant($restaurant),
        ]);
    }
}
