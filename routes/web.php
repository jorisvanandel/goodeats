<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SearchController;
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

    Route::post('/likes', [LikesController::class, 'store'])->name('likes.store');
    Route::delete('/likes', [LikesController::class, 'destroy'])->name('likes.destroy');

    Route::get('/activiteit', function () {
        return Inertia::render('activity');
    })->name('activity');

    Route::get('/account', AccountController::class)->name('account');
});

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

Route::get('{user:username}', ViewProfileController::class)->name('profile');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
 require __DIR__.'/auth.php';
