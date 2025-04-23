<?php

namespace App\Models;

use App\Enums\EngagementType;
use App\Models\Pivot\Following;
use App\Models\Pivot\Engagement;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property-read int $id
 * @property string $name
 * @property string $email
 * @property string $username
 * @property-read Carbon $updated_at
 * @property-read Carbon $created_at
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;
    use Notifiable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
    ];

    /**
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function engagements(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class, 'engagements')->using(Engagement::class);
    }

    public function likes(): BelongsToMany
    {
        return $this->engagements()
            ->tap(fn (Builder $query) => $query->where('type', EngagementType::Like));
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->engagements()
            ->tap(fn (Builder $query) => $query->where('type', EngagementType::Bookmark));
    }

    public function favorites(): BelongsToMany
    {
        return $this->engagements()
            ->tap(fn (Builder $query) => $query->where('type', EngagementType::Favorite));
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followings', 'following_id', 'follower_id')->using(Following::class);
    }

    public function followings(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followings', 'follower_id', 'following_id')->using(Following::class);
    }

    public function follows(User $user): bool
    {
        return $this->followings()->where('following_id', $user->id)->exists();
    }
}
