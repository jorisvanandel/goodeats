import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { User } from '@/types/resources';
import { Link } from '@inertiajs/react';

type UserCardProps = {
    user: User;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <Link href={route('profile', { user: user })}>
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <TextHeading size="xs">{user.name}</TextHeading>
                        <TextParagraph variant="muted">{user.username}</TextParagraph>
                    </div>
                </div>
            </div>
        </Link>
    );
}
