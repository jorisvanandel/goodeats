<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateFollowingAction;
use App\Actions\RemoveFollowingAction;
use App\Http\Requests\AddFollowingRequest;
use App\Http\Requests\RemoveFollowingRequest;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class FollowingsController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector
    ) {}

    public function store(
        AddFollowingRequest $request,
        CreateFollowingAction $action,
        #[CurrentUser] $user
    ): RedirectResponse {
        $action->execute($user, $request->following());

        return $this->redirector->back();
    }

    public function destroy(
        RemoveFollowingRequest $request,
        RemoveFollowingAction $action,
        #[CurrentUser] $user
    ): RedirectResponse {
        $action->execute($user, $request->following());

        return $this->redirector->back();
    }
}
