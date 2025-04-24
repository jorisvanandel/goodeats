import { TextHeading, TextParagraph } from '@/components/ui/text';
import { User } from '@/types/resources';
import { Link } from '@inertiajs/react';
import { UserAvatar } from '@/components/user-avatar';

type UserCardProps = {
    user: User;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <Link href={route('profile', { user: user })}>
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                    <UserAvatar user={user}/>
                    <div>
                        <TextHeading size="xs">{user.name}</TextHeading>
                        <TextParagraph variant="muted">{user.username}</TextParagraph>
                    </div>
                </div>
            </div>
        </Link>
    );
}
