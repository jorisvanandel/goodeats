<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\AuthManager;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly AuthManager $authManager
    )
    {
    }

    public function __invoke(): Response
    {
        if ($this->authManager->check()) {
            return Inertia::render('home');
        }

        return Inertia::render('landing');
    }
}
