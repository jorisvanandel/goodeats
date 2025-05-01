<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector,
    ) {}

    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::query()->createOrFirst([
            'oauth_driver_id' => $googleUser->id,
        ], [
            'name' => $googleUser->getName(),
            'username' => Str::of($googleUser->getName())->slug('')->value(),
            'email' => $googleUser->getEmail(),
        ]);

        Auth::login($user);

        if ($user->wasRecentlyCreated) {
            return redirect(route('finish-profile.show'));
        }

        return $this->redirector->route(route('home'));
    }
}
