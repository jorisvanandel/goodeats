import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, HomeIcon, ListIcon, type LucideIcon, SearchIcon, UserIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { useRoute } from 'ziggy-js';

type NavigationItem = {
    label: string;
    icon: LucideIcon;
    href: string;
    active: boolean;
};

type AuthenticatedLayoutProps = PropsWithChildren & { title?: string };

function AuthenticatedLayoutContent({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('relative flex-grow overflow-y-scroll px-4 py-8', className)} {...props} />;
}

function AuthenticatedLayoutHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('mb-5 space-y-1', className)} {...props} />;
}

function AuthenticatedLayoutTitle({ ...props }: React.ComponentProps<typeof TextHeading>) {
    return <TextHeading size="lg" {...props} />;
}

function AuthenticatedLayoutDescription({ ...props }: React.ComponentProps<typeof TextParagraph>) {
    return <TextParagraph variant="muted" {...props} />;
}

function AuthenticatedLayoutBackButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    return (
        <Button
            onClick={() => window.history.back()}
            variant="outline"
            className={cn('absolute top-5 left-5 z-10 size-9 rounded-full', className)}
            {...props}
        >
            <ChevronLeft className="size-5" />
        </Button>
    );
}

function AuthenticatedLayout({ title, children }: AuthenticatedLayoutProps) {
    const route = useRoute();

    const navigationItems: NavigationItem[] = [
        { label: 'Home', icon: HomeIcon, href: route('home'), active: route().current('home') },
        { label: 'Zoeken', icon: SearchIcon, href: route('search'), active: route().current('search') },
        { label: 'Mijn lijsten', icon: ListIcon, href: route('my-lists'), active: route().current('my-lists') },
        { label: 'Account', icon: UserIcon, href: route('account'), active: route().current('account') },
    ];

    return (
        <>
            <Head title={title} />
            <div className="bg-background relative mx-auto flex h-dvh max-w-md flex-col">
                {children}
                <div className="grid grid-cols-4 gap-x-5 bg-slate-50">
                    {navigationItems.map((item, itemIdx) => (
                        <Link
                            prefetch="mount"
                            key={itemIdx}
                            className={cn(
                                'flex h-16 flex-col items-center border-t-3 py-3',
                                item.active ? 'border-t-primary text-primary' : 'border-t-transparent',
                            )}
                            href={item.href}
                        >
                            <item.icon className="size-5 shrink-0" />
                            <span className="mt-2 text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <Toaster position="top-center" />
        </>
    );
}

export {
    AuthenticatedLayout,
    AuthenticatedLayoutBackButton,
    AuthenticatedLayoutContent,
    AuthenticatedLayoutDescription,
    AuthenticatedLayoutHeader,
    AuthenticatedLayoutTitle,
};
