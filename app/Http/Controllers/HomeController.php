<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Auth\AuthManager;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly AuthManager $authManager
    ) {}

    public function __invoke(): Response
    {
        if ($this->authManager->check()) {
            return Inertia::render('home');
        }

        return Inertia::render('landing');
    }
}
