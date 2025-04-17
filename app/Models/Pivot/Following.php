<?php

declare(strict_types=1);

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Following extends Pivot
{
    protected $table = 'followings';
}
