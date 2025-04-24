<?php

namespace Database\Factories;

use App\Enums\City;
use App\Models\Restaurant;
use Closure;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;

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
            'google_places_id' => $this->faker->uuid,
            'name' => $this->faker->name(),
            'city' => $this->faker->randomElement(City::cases()),
            'address' => $this->faker->address(),
        ];
    }

    public function configure(): self
    {
        return $this->afterCreating(function (Restaurant $restaurant) {
            $images = File::files(storage_path('app/image-stubs'));

            if (count($images) === 0) {
                return;
            }

            for ($i = 0; $i < $this->faker->numberBetween(2, 5); $i++) {
                $image = $images[$i % count($images)];

                $restaurant->addMedia($image->getRealPath())
                    ->preservingOriginal()
                    ->toMediaCollection('images');
            }
        });
    }
}
