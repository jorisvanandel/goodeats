<?php

namespace App\Http\Resources;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;

/**
 * @property Restaurant $resource
 */
class EngagedRestaurantResource extends RestaurantResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var User $authUser */
        $authUser = app(AuthManager::class)->user();

        return [
            ...parent::toArray($request),
            'visited' => $authUser->hasVisitedRestaurant($this->resource),
            'bookmarked' => $authUser->hasBookmarkedRestaurant($this->resource),
        ];
    }
}
