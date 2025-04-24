import { RestaurantCard } from '@/components/restaurant-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { UserCard } from '@/components/user-card';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PaginatedCollection } from '@/types/pagination';
import { Restaurant, User } from '@/types/resources';
import { Link, router, useForm } from '@inertiajs/react';
import { CogIcon, LinkIcon, LogOutIcon } from 'lucide-react';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { UserAvatar } from '@/components/user-avatar';

type AccountPageProps = {
    user: User;
    engagements: PaginatedCollection<Restaurant>;
    followers: PaginatedCollection<User>;
    followings: PaginatedCollection<User>;
};

export default function Account({ user, engagements, followers, followings }: AccountPageProps) {
    function handleAvatarInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        router.post(route('upload-avatar'), {
            avatar: e.target.files[0]
        }, {
            onSuccess: () => {
                toast.success('Profiel succesvol bijgewerkt!');
            }
        });
    }

    return (
        <AuthenticatedLayout title="Mijn account">
            <div className="flex justify-between">
                <div>
                    <TextHeading>{user.name}</TextHeading>
                    <TextParagraph>{user.username}</TextParagraph>
                </div>
                <div className="relative">
                    <UserAvatar size="xl" user={user}/>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform">
                        <Input
                            className="invisible"
                            id="avatar-file-input"
                            type="file"
                            accept="image/*"
                            tabIndex={2}
                            onChange={handleAvatarInputChange}
                        />
                        <label htmlFor="avatar-file-input">
                            <Button variant="outline" size="sm" asChild>
                                <span>Uploaden</span>
                            </Button>
                        </label>
                    </div>
                </div>
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
                        <LogOutIcon />
                    </Link>
                </Button>
            </div>
            <Tabs className="mt-5" defaultValue="engagements">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="engagements">Restaurants</TabsTrigger>
                    <TabsTrigger value="followers">Volgers</TabsTrigger>
                    <TabsTrigger value="following">Volgend</TabsTrigger>
                </TabsList>
                <TabsContent className="mt-4 px-3 grid gap-y-3" value="engagements">
                    {engagements.data.map((restaurant, restaurantIdx) => (
                        <RestaurantCard restaurant={restaurant} key={restaurantIdx} />
                    ))}
                    {engagements.data.length === 0 && (
                        <TextParagraph className="max-w-sm text-center mx-auto" variant="muted">Je hebt nog geen restauranten toegevoegd aan je lijst.</TextParagraph>
                    )}
                </TabsContent>
                <TabsContent className="mt-4 px-3" value="followers">
                    <div className="divide-divide divide-y">
                        {followers.data.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                    {followers.data.length === 0 && (
                        <TextParagraph className="max-w-sm text-center mx-auto" variant="muted">Je hebt nog geen volgers.</TextParagraph>
                    )}
                </TabsContent>
                <TabsContent className="px-3 mt-4" value="following">
                    <div className="divide-divide divide-y">
                        {followings.data.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                    {followings.data.length === 0 && (
                        <TextParagraph className="max-w-sm text-center mx-auto" variant="muted">Je volgt nog geen andere mensen.</TextParagraph>
                    )}
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
