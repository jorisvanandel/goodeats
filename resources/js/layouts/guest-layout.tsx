import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';
import { RootLayout } from '@/layouts/root-layout';

type GuestLayoutProps = {
    title: string;
    className?: string;
};

export default function GuestLayout({ children, className, title }: PropsWithChildren<GuestLayoutProps>) {
    return (
        <RootLayout title={title}>
            <div className={cn('bg-background relative z-10 mx-auto h-dvh w-screen max-w-md', className)}>
                {children}
            </div>
        </RootLayout>
    );
}
