<?php

declare(strict_types=1);

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Engagement extends Pivot
{
    protected $table = 'engagements';

    protected $fillable = [
        'type'
    ];
}
