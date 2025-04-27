import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { UserAvatar } from '@/components/user-avatar';
import { UserCard } from '@/components/user-card';
import { AuthenticatedLayout, AuthenticatedLayoutContent, AuthenticatedLayoutTitle } from '@/layouts/authenticated-layout';
import { PaginatedCollection } from '@/types/pagination';
import { User } from '@/types/resources';
import { Link, router } from '@inertiajs/react';
import { LinkIcon, LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

type AccountPageProps = {
    user: User;
    followers: PaginatedCollection<User>;
    followings: PaginatedCollection<User>;
};

export default function Account({ user, followers, followings }: AccountPageProps) {
    function handleAvatarInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        router.post(
            route('upload-avatar'),
            {
                avatar: e.target.files[0],
            },
            {
                onSuccess: () => {
                    toast.success('Profiel succesvol bijgewerkt!');
                },
            },
        );
    }

    return (
        <AuthenticatedLayout title="Account">
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutTitle>Account</AuthenticatedLayoutTitle>
                <div className="flex items-center justify-between">
                    <div>
                        <TextHeading>{user.name}</TextHeading>
                        <TextParagraph>{user.username}</TextParagraph>
                    </div>
                    <div className="relative">
                        <UserAvatar size="xl" user={user} />
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
                <div className="mt-8 flex gap-2">
                    <Button size="md" asChild variant="outline">
                        <Link href={route('profile', { user: user })}>
                            <LinkIcon />
                            Publiek profiel
                        </Link>
                    </Button>
                    <Button variant="outline" size="md" asChild>
                        <Link href={route('logout')} method="post">
                            <LogOutIcon />
                        </Link>
                    </Button>
                </div>
                <Tabs className="mt-5" defaultValue="followers">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="followers">Volgers</TabsTrigger>
                        <TabsTrigger value="following">Volgend</TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-4 px-3" value="followers">
                        <div className="divide-divide divide-y">
                            {followers.data.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                        {followers.data.length === 0 && (
                            <TextParagraph className="mx-auto max-w-sm text-center" variant="muted">
                                Je hebt nog geen volgers.
                            </TextParagraph>
                        )}
                    </TabsContent>
                    <TabsContent className="mt-4 px-3" value="following">
                        <div className="divide-divide divide-y">
                            {followings.data.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                        {followings.data.length === 0 && (
                            <TextParagraph className="mx-auto max-w-sm text-center" variant="muted">
                                Je volgt nog geen andere mensen.
                            </TextParagraph>
                        )}
                    </TabsContent>
                </Tabs>
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
