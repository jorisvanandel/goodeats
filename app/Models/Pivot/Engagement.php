<?php

declare(strict_types=1);

namespace App\Models\Pivot;

use App\Enums\EngagementType;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property-read int $restaurant_id
 * @property-read int $user_id
 * @property Restaurant $restaurant
 * @property User $user
 * @property EngagementType $type
 * @property int|null $rating
 */
class Engagement extends Pivot
{
    protected $table = 'engagements';

    protected $fillable = [
        'type',
        'rating',
    ];

    public function casts(): array
    {
        return [
            'type' => EngagementType::class,
        ];
    }
}
