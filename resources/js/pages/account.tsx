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

type AccountPageProps = {
    user: User;
    likes: PaginatedCollection<Restaurant>;
}

export default function Account({ user, likes }: AccountPageProps) {
    const following = [
        { name: 'Joris van Andel', username: 'jorisvanandel', followBack: false },
        { name: 'Sophie de Ruiter', username: 'sophiederuiter', followBack: true },
        { name: 'Joris van Andel', username: 'jorisvanandel-2', followBack: true },
        { name: 'Bram van Gelder', username: 'brammetjevang', followBack: false },
        { name: 'Kees van der Spek', username: 'keesjevanderspekje', followBack: false },
        { name: 'Daan Ferdinandusse', username: 'daanferdinandusse', followBack: true },
    ];

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
                    <TabsTrigger disabled value="followers">Volgers</TabsTrigger>
                    <TabsTrigger disabled value="following">Volgend</TabsTrigger>
                </TabsList>
                <TabsContent className="grid gap-y-3" value="likes">
                    {likes.data.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
                    ))}
                </TabsContent>
                <TabsContent value="followers">
                    <div className="divide-divide divide-y">
                        {following.map((user, userIdx) => (
                            <div className="flex items-center justify-between py-3">
                                <div key={userIdx} className="flex items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <TextHeading size="xs">{user.name}</TextHeading>
                                        <TextParagraph variant="muted">{user.username}</TextParagraph>
                                    </div>
                                </div>
                                {user.followBack ? (
                                    <Button size="sm" variant="outline">
                                        Bekijk profiel
                                    </Button>
                                ) : (
                                    <Button size="sm" variant="default">
                                        Volg terug
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="following">
                    <div className="divide-divide divide-y">
                        {following.map((user, userIdx) => (
                            <div className="flex items-center justify-between py-3">
                                <div key={userIdx} className="flex items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <TextHeading size="xs">{user.name}</TextHeading>
                                        <TextParagraph variant="muted">{user.username}</TextParagraph>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
