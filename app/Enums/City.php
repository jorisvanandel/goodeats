<?php

declare(strict_types=1);

namespace App\Enums;

enum City: string
{
    case Amsterdam = 'amsterdam';
    case Utrecht = 'utrecht';

    /**
     * Get the coordinates that form a square of the center of the city. Read them as follows:
     * Northwest[Lat,Lng], Northeast[Lat,Lng], Southwest[Lat,Lng], Southeast[Lat,Lng].
     *
     * @return array<list<float>>
     */
    public function coordinates(): array
    {
        return match ($this) {
            self::Amsterdam => [
                [52.3860, 4.8730],
                [52.3860, 4.9210],
                [52.3500, 4.8730],
                [52.3500, 4.9210]
            ],
            self::Utrecht => []
        };
    }
}
