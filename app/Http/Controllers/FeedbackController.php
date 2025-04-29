<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\FeedbackRequest;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector,
    )
    {
    }

    public function __invoke(FeedbackRequest $request, #[CurrentUser] User $user): RedirectResponse
    {
        Log::info("Feedback by [{$user->username}]: {$request->feedback()}");

        return $this->redirector->back();
    }
}
