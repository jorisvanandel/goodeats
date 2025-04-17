import { Head } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type GuestLayoutProps = {
    title: string;
    className?: string;
};

export default function GuestLayout({ children, className, title }: PropsWithChildren<GuestLayoutProps>) {
    return (
        <div className={cn('relative bg-background z-10 mx-auto h-dvh w-screen max-w-md', className)}>
            <Head title={title} />
            {children}
        </div>
    );
}
