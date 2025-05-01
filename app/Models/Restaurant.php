<?php

namespace App\Models;

use App\Enums\City;
use Carbon\Carbon;
use Database\Factories\RestaurantFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property-read int $id
 * @property string $google_places_id
 * @property string $name
 * @property City $city
 * @property string $address
 * @property-read Carbon $updated_at
 * @property-read Carbon $created_at
 */
class Restaurant extends Model implements HasMedia
{
    /** @use HasFactory<RestaurantFactory> */
    use HasFactory;

    use InteractsWithMedia;
    use Notifiable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'google_places_id',
        'name',
        'city',
        'address',
        'tags',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'city' => City::class,
            'tags' => 'array',
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->performOnCollections('images')
            ->width(500);
    }
}
