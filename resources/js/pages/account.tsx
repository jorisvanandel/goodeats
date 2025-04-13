import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { CogIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from '@inertiajs/react';

export default function Account() {
    const user = {
        name: 'Joris van Andel',
        username: 'jorisvanandel',
        followers_count: 22,
    };

    const [loading, setLoading] = useState<boolean>(true);

    const likes = [
        { name: 'Cafe Caron', street: 'Frans Halsstraat 28' },
        { name: 'Scheepskameel', street: 'Lijnbaansgracht 318-3' },
        { name: 'Zoldering', street: 'Utrechtsedwarsstraat 313-2' },
        { name: 'De Juwelier', street: 'Jan Kerkstraat 37-H' },
        { name: 'De Juwelier', street: 'Jan Kerkstraat 37-H' },
        { name: 'De Juwelier', street: 'Jan Kerkstraat 37-H' },
    ];

    const following = [
        { name: 'Joris van Andel', username: 'jorisvanandel', followBack: false },
        { name: 'Sophie de Ruiter', username: 'sophiederuiter', followBack: true },
        { name: 'Joris van Andel', username: 'jorisvanandel-2', followBack: true },
        { name: 'Bram van Gelder', username: 'brammetjevang', followBack: false },
        { name: 'Kees van der Spek', username: 'keesjevanderspekje', followBack: false },
        { name: 'Daan Ferdinandusse', username: 'daanferdinandusse', followBack: true },
    ];

    setTimeout(() => setLoading(false), 500);

    return (
        <AuthenticatedLayout title="Mijn profiel">
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
                <Button variant="outline" size="md" onClick={() => toast.info('Hier wordt nog aan gewerkt. Kom later terug!')}>
                    Profiel bewerken
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
                    {likes.map((like) => {
                        return loading ? (
                            <Skeleton className="h-32" />
                        ) : (
                            <Card className="gap-0 overflow-hidden p-0">
                                <Carousel>
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <img
                                                    alt={like.name}
                                                    className="h-40 w-full object-cover"
                                                    src="https://scontent.frtm1-1.fna.fbcdn.net/v/t39.30808-6/484913549_1184638113663160_3905320551823377024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XTis-n9_ZuIQ7kNvwHxe6Mm&_nc_oc=AdmELph6ElgUIKYfOYqbWQG1YnNlGnMUAYNRiH14a50vUw8TY0c66DPXbaRn-4HtItY&_nc_zt=23&_nc_ht=scontent.frtm1-1.fna&_nc_gid=iPPFqUGy_iQAIgCjk7Emxw&oh=00_AfHUC-dJiosnUF4mbxsY-0SyfivzEtk7QXj6zSu6VcNA5A&oe=67FED828"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-4" />
                                    <CarouselNext className="right-4" />
                                </Carousel>
                                <CardContent className="py-4">
                                    <TextHeading>{like.name}</TextHeading>
                                    <TextParagraph>{like.street}</TextParagraph>
                                </CardContent>
                            </Card>
                        );
                    })}
                </TabsContent>
                <TabsContent value="followers">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-16" />)
                    ) : (
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
                    )}
                </TabsContent>
                <TabsContent value="following">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-16" />)
                    ) : (
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
                    )}
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
