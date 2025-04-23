<?php

declare(strict_types=1);

namespace App\Enums;

enum EngagementType: string
{
    case Like = 'like';
    case Favorite = 'favorite';
    case Bookmark = 'bookmark';
}
