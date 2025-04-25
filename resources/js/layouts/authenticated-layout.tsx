import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { ActivityIcon, ChevronLeft, HomeIcon, type LucideIcon, SearchIcon, UserIcon } from 'lucide-react';
import { MouseEvent, type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useRoute } from 'ziggy-js';

type NavigationItem = {
    label: string;
    icon: LucideIcon;
    href: string;
    disabled?: boolean;
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
        { label: 'Activiteit', icon: ActivityIcon, href: '#', disabled: true, active: route().current('activity') },
        { label: 'Account', icon: UserIcon, href: route('account'), active: route().current('account') },
    ];

    const handleOnNavigationItemClick = (event: MouseEvent, item: NavigationItem) => {
        if (!item.disabled) {
            return;
        }

        event.preventDefault();
        toast.info('Deze pagina is nog niet beschikbaar. Kom later terug!');
    };

    return (
        <>
            <Head title={title} />
            <div className="bg-background relative mx-auto flex h-dvh max-w-md flex-col">
                {children}
                <div className="grid grid-cols-4 gap-x-5 bg-slate-50">
                    {navigationItems.map((item, itemIdx) => (
                        <Link
                            key={itemIdx}
                            className={cn(
                                'flex h-16 flex-col items-center border-t-3 py-3',
                                item.active ? 'border-t-primary text-primary' : 'border-t-transparent',
                            )}
                            href={item.href}
                            onClick={(e) => handleOnNavigationItemClick(e, item)}
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
