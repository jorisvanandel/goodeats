<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SearchRestaurantsRequest;
use App\Http\Resources\EngagedRestaurantResource;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Inertia\Inertia;
use Inertia\Response;

class MyListsController extends Controller
{
    public function __invoke(SearchRestaurantsRequest $request, #[CurrentUser] User $user): Response
    {
        $visits = $user->visits()
            ->with(['media'])
            ->paginate();

        $bookmarks = $user->bookmarks()
            ->with(['media'])
            ->paginate();

        return Inertia::render('my-lists', [
            'visits' => Inertia::defer(fn () => EngagedRestaurantResource::collection($visits)),
            'bookmarks' => Inertia::defer(fn () => EngagedRestaurantResource::collection($bookmarks)),
        ]);
    }
}
