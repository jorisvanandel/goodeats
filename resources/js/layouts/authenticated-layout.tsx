import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { TextHeading } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
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
}

type AuthenticatedLayoutProps = PropsWithChildren & { title?: string; isPadded?: boolean; showBackButton?: boolean };
export default function AuthenticatedLayout({ title, isPadded = true, showBackButton = false, children }: AuthenticatedLayoutProps) {
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
            <div className="flex max-w-md mx-auto h-dvh flex-col">
                <div className={cn('relative flex-grow overflow-y-scroll', isPadded && 'p-4')}>
                    {showBackButton && (
                        <Button onClick={() => window.history.back()} variant="outline" className="absolute top-5 left-5 z-10 size-9 rounded-full">
                            <ChevronLeft className="size-5" />
                        </Button>
                    )}
                    {title && (
                        <TextHeading size="xl" className="mb-5">
                            {title}
                        </TextHeading>
                    )}
                    {children}
                </div>
                <div className="grid grid-cols-4 gap-x-5 bg-slate-50">
                    {navigationItems.map((item, itemIdx) => (
                        <Link key={itemIdx} className={cn('flex flex-col border-t-3 h-16 items-center py-3', item.active ? 'border-t-primary text-primary' : 'border-t-transparent')} href={item.href} onClick={(e) => handleOnNavigationItemClick(e, item)}>
                            <item.icon className="shrink-0 size-5" />
                            <span className="mt-2 text-xs">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <Toaster position="top-center" richColors />
        </>
    );
}
