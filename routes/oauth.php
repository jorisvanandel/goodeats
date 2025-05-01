<?php

use App\Http\Controllers\Auth\OAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/oauth/google/redirect', [OAuthController::class, 'redirect'])->name('oauth.google.redirect');
Route::get('/oauth/google/callback', [OAuthController::class, 'callback'])->name('oauth.google.callback');
