import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TextHeading } from '@/components/ui/text';
import { Restaurant, User } from '@/types/resources';
import { PaginatedCollection } from '@/types/pagination';
import { RestaurantCard } from '@/components/restaurant-card';

type ProfilePageProps = {
    user: User;
    likes: PaginatedCollection<Restaurant>;
}

export default function ProfilePage({ user, likes }: ProfilePageProps) {
    return (
        <div className="relative flex flex-col px-4 py-8">
            <div className="text-center">
                <Avatar className="mx-auto size-24">
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <TextHeading size="lg" className="mt-4">{user.name}</TextHeading>
            </div>

            <div className="mt-4">
                <TextHeading size="sm">Gelikede restaurants</TextHeading>
                <div className="mt-2 grid gap-3">
                    {likes.data.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
