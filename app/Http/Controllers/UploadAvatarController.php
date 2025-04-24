<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UploadAvatarRequest;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class UploadAvatarController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector
    )
    {
    }

    public function __invoke(UploadAvatarRequest $request, #[CurrentUser] User $user): RedirectResponse
    {
        if ($request->hasFile('avatar')) {
            $user->addMediaFromRequest('avatar')
                ->toMediaCollection('avatar');
        }

        return $this->redirector->back();
    }
}
