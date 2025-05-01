import { Button } from '@/components/ui/button';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { UserAvatar } from '@/components/user-avatar';
import { EngagedUser, User } from '@/types/resources';
import { Link, router } from '@inertiajs/react';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

type UserCardProps = {
    user: User | EngagedUser;
};

export function UserCard({ user }: UserCardProps) {
    function toggleFollowing() {
        if (!('following' in user)) {
            return;
        }

        if (user.following) {
            router.delete(route('followings.destroy', { user_id: user.id }), {
                onSuccess: () => toast.success(`Je volgt ${user.name} niet meer.`),
            });
        } else {
            router.post(
                route('followings.store', { user_id: user.id }),
                {},
                {
                    onSuccess: () => toast.success(`Je bent ${user.name} gaan volgen!`),
                },
            );
        }
    }

    return (
        <div className="flex items-center justify-between py-3">
            <Link className="flex-grow" href={route('profile', { user: user })}>
                <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <div>
                        <TextHeading size="xs">{user.name}</TextHeading>
                        <TextParagraph variant="muted">{user.username}</TextParagraph>
                    </div>
                </div>
            </Link>
            {'following' in user && (
                <Button size="sm" variant="outline" onClick={toggleFollowing}>
                    {user.following && <CheckIcon />}
                    {user.following ? 'Volgend' : 'Volgen'}
                </Button>
            )}
        </div>
    );
}
