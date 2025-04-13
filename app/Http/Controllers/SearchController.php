<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $restaurants = Restaurant::query()->paginate(10);

        return Inertia::render('search', [
            'restaurants' => RestaurantResource::collection($restaurants)
        ]);
    }
}
