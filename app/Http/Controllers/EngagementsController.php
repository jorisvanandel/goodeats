<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateEngagementAction;
use App\Actions\RemoveEngagementAction;
use App\Http\Requests\AddEngagementRequest;
use App\Http\Requests\RemoveEngagementRequest;
use App\Models\Restaurant;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class EngagementsController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector
    )
    {
    }

    public function store(
        AddEngagementRequest   $request,
        CreateEngagementAction $action,
        #[CurrentUser]         $user
    ): RedirectResponse {
        $action->execute($request->restaurant(), $user, $request->type());

        return $this->redirector->back();
    }

    public function destroy(
        RemoveEngagementRequest $request,
        RemoveEngagementAction  $action,
        #[CurrentUser]          $user
    ): RedirectResponse {
        $action->execute($request->restaurant(), $user, $request->type());

        return $this->redirector->back();
    }
}
