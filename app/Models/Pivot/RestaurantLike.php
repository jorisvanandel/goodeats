<?php

declare(strict_types=1);

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RestaurantLike extends Pivot
{
    protected $table = 'restaurant_user';
}
