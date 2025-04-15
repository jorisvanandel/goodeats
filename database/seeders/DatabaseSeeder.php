<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'email' => 'test@user.com',
        ]);

        User::factory(20)->create();
        Restaurant::factory(20)->create();
    }
}
