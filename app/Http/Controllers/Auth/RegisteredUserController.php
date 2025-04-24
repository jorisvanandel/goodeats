<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(
        private readonly Redirector $redirector,
    )
    {
    }

    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $inferredUsername = Str::of($request->email)
            ->before('@')
            ->replaceMatches('/[^A-Za-z0-9]++/', '');

        $user = User::create([
            'email' => $request->email,
            'username' => $inferredUsername,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return $this->redirector->route('finish-profile.show');
    }
}
