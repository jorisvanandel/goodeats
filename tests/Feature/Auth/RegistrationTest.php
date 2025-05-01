<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('finish-profile.show', absolute: false));
});
