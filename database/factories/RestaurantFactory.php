<?php

namespace Database\Factories;

use App\Enums\City;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'google_places_id' => fake()->uuid,
            'name' => fake()->name(),
            'city' => fake()->randomElement(City::cases()),
            'address' => fake()->address(),
        ];
    }
}
