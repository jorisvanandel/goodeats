<?php

namespace App\Models;

use App\Enums\EngagementType;
use App\Models\Pivot\Following;
use App\Models\Pivot\Engagement;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property-read int $id
 * @property ?string $oauth_driver_id = null
 * @property string $name
 * @property string $email
 * @property string $username
 * @property-read Collection<Restaurant> $engagements
 * @property-read Carbon $updated_at
 * @property-read Carbon $created_at
 */
class User extends Authenticatable implements MustVerifyEmail, HasMedia
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;
    use Notifiable;
    use InteractsWithMedia;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'oauth_driver_id',
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
        return $this->belongsToMany(Restaurant::class, 'engagements')
            ->withPivot(['type'])
            ->using(Engagement::class);
    }

    public function visits(): BelongsToMany
    {
        return $this->engagements()
            ->tap(fn (Builder $query) => $query->where('type', EngagementType::Visit));
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->engagements()
            ->tap(fn (Builder $query) => $query->where('type', EngagementType::Bookmark));
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

    public function hasEngagedWithRestaurant(Restaurant $restaurant, EngagementType $type): bool
    {
        return $this->engagements->contains(function (Restaurant $engaged) use ($restaurant, $type) {
            /** @var Engagement $pivot */
            $pivot = $engaged->pivot;

            return $pivot->restaurant_id === $restaurant->id && $pivot->type === $type;
        });
    }

    public function hasVisitedRestaurant(Restaurant $restaurant): bool
    {
        return $this->hasEngagedWithRestaurant($restaurant, EngagementType::Visit);
    }

    public function hasBookmarkedRestaurant(Restaurant $restaurant): bool
    {
        return $this->hasEngagedWithRestaurant($restaurant, EngagementType::Bookmark);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->performOnCollections('avatar')
            ->width(100);
    }
}
