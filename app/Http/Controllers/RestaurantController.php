<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantController extends Controller
{
    public function show(Restaurant $restaurant): Response
    {
        return Inertia::render('restaurant', [
            'restaurant' => RestaurantResource::make($restaurant)
        ]);
    }
}
