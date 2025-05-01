<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\FinishProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;
use Inertia\Response;

class FinishProfileController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector,
    ) {}

    public function show(#[CurrentUser] User $user): Response
    {
        return Inertia::render('finish-profile', [
            'user' => UserResource::make($user),
        ]);
    }

    public function store(FinishProfileRequest $request, #[CurrentUser] User $user): RedirectResponse
    {
        $user->name = $request->input('name');
        $user->username = $request->input('username');
        $user->save();

        if ($request->hasFile('avatar')) {
            $user->addMediaFromRequest('avatar')
                ->toMediaCollection('avatar');
        }

        return $this->redirector->route('account');
    }
}
