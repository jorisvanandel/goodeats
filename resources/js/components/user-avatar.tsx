import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/resources';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

const userAvatarVariants = cva(
    "",
    {
        variants: {
            size: {
                sm: "size-10 text-base",
                md: "size-14 text-lg",
                lg: "size-18 text-xl",
                xl: "size-24 text-2xl"
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

type UserAvatarProps = {
    user: User;
} & React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof userAvatarVariants>;

export function UserAvatar({ user, size, className }: UserAvatarProps) {
    return (
        <Avatar className={cn(userAvatarVariants({ size }), className)}>
            <AvatarImage src={user.avatar?.preview_url} />
            <AvatarFallback>{user.name.toUpperCase().slice(0, 2)}</AvatarFallback>
        </Avatar>
    );
}
