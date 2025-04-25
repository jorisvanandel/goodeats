<?php

declare(strict_types=1);

namespace App\Enums;

enum EngagementType: string
{
    case Visit = 'visit';
    case Bookmark = 'bookmark';
}
