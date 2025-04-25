import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';

type GuestLayoutProps = {
    title: string;
    className?: string;
};

export default function GuestLayout({ children, className, title }: PropsWithChildren<GuestLayoutProps>) {
    return (
        <div className={cn('bg-background relative z-10 mx-auto h-dvh w-screen max-w-md', className)}>
            <Head title={title} />
            {children}
            <Toaster position="top-center" />
        </div>
    );
}
