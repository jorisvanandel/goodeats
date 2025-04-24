<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SearchRestaurantsRequest;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\UserResource;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(SearchRestaurantsRequest $request): Response
    {
        $restaurants = Restaurant::query()
            ->when(
                $request->searchQuery() !== null,
                fn (Builder $query) => $query->whereLike('name', "%{$request->searchQuery()}%")
            )
            ->with(['media'])
            ->paginate();

        $users = User::query()
            ->when(
                $request->searchQuery() !== null,
                fn (Builder $query) => $query->whereAny(['name', 'username'],'LIKE', "%{$request->searchQuery()}%")
            )
            ->paginate();

        return Inertia::render('search', [
            'restaurants' => Inertia::defer(fn () => RestaurantResource::collection($restaurants)),
            'users' => Inertia::defer(fn () => UserResource::collection($users)),
        ]);
    }
}
