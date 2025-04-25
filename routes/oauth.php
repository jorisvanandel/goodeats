<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/oauth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
})->name('oauth.google.redirect');

Route::get('/oauth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    Log::info($googleUser);

    $user = User::query()->updateOrCreate([
        'oauth_driver_id' => $googleUser->id,
    ], [
        'name' => $googleUser->getName(),
        'email' => $googleUser->getEmail(),
    ]);

    Auth::login($user);

    return redirect('/home');
})->name('oauth.google.callback');
