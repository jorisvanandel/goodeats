<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FollowingsController;
use App\Http\Controllers\EngagementsController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UploadAvatarController;
use App\Http\Controllers\ViewProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('landing');
    })->name('landing');

    Route::get('/registreren', [RegisteredUserController::class, 'create'])->name('register');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('home');
    })->name('home');

    Route::get('/zoeken', SearchController::class)->name('search');

    Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show'])->name('restaurants.show');

    Route::post('/engagements', [EngagementsController::class, 'store'])->name('engagements.store');
    Route::delete('/engagements', [EngagementsController::class, 'destroy'])->name('engagements.destroy');

    Route::post('/followings', [FollowingsController::class, 'store'])->name('followings.store');
    Route::delete('/followings', [FollowingsController::class, 'destroy'])->name('followings.destroy');

    Route::get('/activiteit', function () {
        return Inertia::render('activity');
    })->name('activity');

    Route::get('/account', AccountController::class)->name('account');
    Route::post('/avatar', UploadAvatarController::class)->name('upload-avatar');
});

Route::get('{user:username}', ViewProfileController::class)->name('profile');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
 require __DIR__.'/auth.php';
