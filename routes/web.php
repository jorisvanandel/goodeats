<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('landing');

Route::middleware(['auth'])->group(function () {
    Route::get('/home', function () {
        return Inertia::render('home');
    })->name('home');

    Route::get('/zoeken', function () {
        return Inertia::render('search');
    })->name('search');

    Route::get('/restaurant/{restaurant}', function () {
        return Inertia::render('restaurant');
    })->name('restaurants.show');

    Route::get('/activiteit', function () {
        return Inertia::render('activity');
    })->name('activity');

    Route::get('/profiel', function () {
        return Inertia::render('account');
    })->name('account');
});

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
 require __DIR__.'/auth.php';
