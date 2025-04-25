<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

Route::get('/oauth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
})->name('oauth.google.redirect');

Route::get('/oauth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    $user = User::query()->updateOrCreate([
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

    return redirect('/home');
})->name('oauth.google.callback');
