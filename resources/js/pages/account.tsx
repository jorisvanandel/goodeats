import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Link } from '@inertiajs/react';
import { LinkIcon } from 'lucide-react';
import { Restaurant, User } from '@/types/resources';
import { PaginatedCollection } from '@/types/pagination';
import { RestaurantCard } from '@/components/restaurant-card';
import { UserCard } from '@/components/user-card';

type AccountPageProps = {
    user: User;
    likes: PaginatedCollection<Restaurant>;
    followers: PaginatedCollection<User>;
    followings: PaginatedCollection<User>;
}

export default function Account({ user, likes, followers, followings }: AccountPageProps) {
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
                        <LinkIcon/>
                        Bekijk publieke profiel
                    </Link>
                </Button>
                <Button variant="outline" size="md" asChild>
                    <Link href={route('logout')} method="post">Uitloggen</Link>
                </Button>
            </div>
            <Tabs className="mt-5" defaultValue="likes">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="likes">Likes</TabsTrigger>
                    <TabsTrigger value="followers">Volgers</TabsTrigger>
                    <TabsTrigger value="following">Volgend</TabsTrigger>
                </TabsList>
                <TabsContent className="grid gap-y-3" value="likes">
                    {likes.data.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
                    ))}
                </TabsContent>
                <TabsContent value="followers">
                    <div className="divide-divide divide-y">
                        {followers.data.map((user) => (
                            <UserCard key={user.id} user={user}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="following">
                    <div className="divide-divide divide-y">
                        {followings.data.map((user) => (
                            <UserCard key={user.id} user={user}/>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
