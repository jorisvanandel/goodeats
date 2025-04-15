<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateLikeAction;
use App\Actions\RemoveLikeAction;
use App\Http\Requests\AddLikeRequest;
use App\Http\Requests\RemoveLikeRequest;
use App\Models\Restaurant;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class LikesController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector
    )
    {
    }

    public function store(
        AddLikeRequest   $request,
        CreateLikeAction $action,
        #[CurrentUser]   $user
    ): RedirectResponse {
        $action->execute($request->restaurant(), $user);

        return $this->redirector->back();
    }

    public function destroy(
        RemoveLikeRequest $request,
        RemoveLikeAction  $action,
        #[CurrentUser]    $user
    ): RedirectResponse {
        $action->execute($request->restaurant(), $user);

        return $this->redirector->back();
    }
}
