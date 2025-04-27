<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;

/**
 * @property User $resource
 */
class EngagedUserResource extends UserResource
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
            'following' => $authUser->follows($this->resource),
        ];
    }
}
