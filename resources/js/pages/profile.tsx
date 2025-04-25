import { RestaurantCard } from '@/components/restaurant-card';
import { Button } from '@/components/ui/button';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { UserAvatar } from '@/components/user-avatar';
import GuestLayout from '@/layouts/guest-layout';
import type { SharedData } from '@/types';
import { PaginatedCollection } from '@/types/pagination';
import { Restaurant, User } from '@/types/resources';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

type ProfilePageProps = {
    user: User;
    engagements: PaginatedCollection<Restaurant>;
    following: boolean | null;
};

export default function ProfilePage({ user, engagements, following }: ProfilePageProps) {
    function toggleFollowing() {
        if (following === null) {
            return;
        }

        if (following) {
            router.delete(route('followings.destroy', { user_id: user.id }), {
                onSuccess: () => toast.success(`Je volgt ${user.name} niet meer.`)
            });
        } else {
            router.post(route('followings.store', { user_id: user.id }), {}, {
                onSuccess: () => toast.success(`Je bent ${user.name} gaan volgen!`)
            });
        }
    }

    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <GuestLayout title={user.name}>
            <Button onClick={() => window.history.back()} variant="outline" className="absolute top-5 left-5 z-10 size-11 rounded-full">
                <ChevronLeft className="size-6" />
            </Button>
            <div className="relative flex flex-col px-4 py-8">
                <div className="text-center">
                    <UserAvatar size="xl" className="mx-auto" user={user} />
                    <TextHeading size="lg" className="mt-4">
                        {user.name}
                    </TextHeading>
                </div>

                {auth.user?.id !== user.id && following !== null && (
                    <div className="mt-2">
                        <Button size="sm" variant="outline" onClick={toggleFollowing}>
                            {following ? 'Ontvolgen' : 'Volgen'}
                        </Button>
                    </div>
                )}

                <div className="mt-4">
                    <TextHeading size="sm">Restaurants van {user.name}</TextHeading>
                    <div className="mt-2 grid gap-3">
                        {engagements.data.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                        {engagements.data.length === 0 && <TextParagraph variant="muted">Geen restaurants gevonden.</TextParagraph>}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
