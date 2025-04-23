import { RestaurantCard } from '@/components/restaurant-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { UserCard } from '@/components/user-card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginatedCollection } from '@/types/pagination';
import { Restaurant, User } from '@/types/resources';
import { Link } from '@inertiajs/react';
import { LinkIcon } from 'lucide-react';

type AccountPageProps = {
    user: User;
    engagements: PaginatedCollection<Restaurant>;
    followers: PaginatedCollection<User>;
    followings: PaginatedCollection<User>;
};

export default function Account({ user, engagements, followers, followings }: AccountPageProps) {
    return (
        <AuthenticatedLayout title="Mijn account">
            <div className="flex justify-between">
                <div>
                    <TextHeading>{user.name}</TextHeading>
                    <TextParagraph>{user.username}</TextParagraph>
                </div>
                <Avatar className="size-14">
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="mt-5 flex gap-2">
                <Button size="md" asChild variant="outline">
                    <Link href={route('profile', { user: user })}>
                        <LinkIcon />
                        Bekijk publieke profiel
                    </Link>
                </Button>
                <Button variant="outline" size="md" asChild>
                    <Link href={route('logout')} method="post">
                        Uitloggen
                    </Link>
                </Button>
            </div>
            <Tabs className="mt-5" defaultValue="engagements">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="engagements">Restaurants</TabsTrigger>
                    <TabsTrigger value="followers">Volgers</TabsTrigger>
                    <TabsTrigger value="following">Volgend</TabsTrigger>
                </TabsList>
                <TabsContent className="mt-4 grid gap-y-3" value="engagements">
                    {engagements.data.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                    ))}
                </TabsContent>
                <TabsContent className="mt-4" value="followers">
                    <div className="divide-divide divide-y">
                        {followers.data.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent className="mt-4" value="following">
                    <div className="divide-divide divide-y">
                        {followings.data.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
