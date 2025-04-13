<?php

namespace App\Models;

use App\Enums\City;
use Carbon\Carbon;
use Database\Factories\RestaurantFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * @property-read int $id
 * @property string $name
 * @property City $city
 * @property string $address
 * @property-read Carbon $updated_at
 * @property-read Carbon $created_at
 */
class Restaurant extends Model
{
    /** @use HasFactory<RestaurantFactory> */
    use HasFactory;
    use Notifiable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'city',
        'address',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'city' => City::class,
        ];
    }
}
