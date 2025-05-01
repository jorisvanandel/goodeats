<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SearchRestaurantsRequest;
use App\Http\Resources\EngagedRestaurantResource;
use App\Http\Resources\EngagedUserResource;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(SearchRestaurantsRequest $request, #[CurrentUser] User $user): Response
    {
        $restaurants = Restaurant::query()
            ->when(
                $request->searchQuery() !== null,
                fn (Builder $query) => $query->whereLike('name', "%{$request->searchQuery()}%")
            )
            ->with(['media'])
            ->paginate(10);

        $users = User::query()
            ->where('id', '!=', $user->id)
            ->when(
                $request->searchQuery() !== null,
                fn (Builder $query) => $query->whereAny(['name', 'username'], 'LIKE', "%{$request->searchQuery()}%")
            )
            ->paginate(10);

        return Inertia::render('search', [
            'restaurants' => Inertia::defer(fn () => EngagedRestaurantResource::collection($restaurants)),
            'users' => Inertia::defer(fn () => EngagedUserResource::collection($users)),
        ]);
    }
}
