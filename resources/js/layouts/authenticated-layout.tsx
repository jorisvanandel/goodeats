import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { TextHeading } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ActivityIcon, ChevronLeft, HomeIcon, SearchIcon, UserIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useRoute } from 'ziggy-js';

type AuthenticatedLayoutProps = PropsWithChildren & { title?: string; isPadded?: boolean; showBackButton?: boolean };
export default function AuthenticatedLayout({ title, isPadded = true, showBackButton = false, children }: AuthenticatedLayoutProps) {
    const route = useRoute();

    const navigationItems = [
        { label: 'Home', icon: HomeIcon, href: route('home'), active: route().current('home') },
        { label: 'Zoeken', icon: SearchIcon, href: route('search'), active: route().current('search') },
        { label: 'Activiteit', icon: ActivityIcon, href: '#', disabled: true, active: route().current('activity') },
        { label: 'Account', icon: UserIcon, href: route('account'), active: route().current('account') },
    ];

    const handleOnNavigationItemClick = (event: Event, item) => {
        if (!item.disabled) {
            return;
        }

        event.preventDefault();
        toast.info('Deze pagina is nog niet beschikbaar. Kom later terug!');
    };

    return (
        <>
            <div className="flex h-dvh flex-col">
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
                <div className="flex justify-around bg-slate-50 p-4">
                    {navigationItems.map((item, itemIdx) => (
                        <Button
                            className={cn('h-fit', item.active && 'font-bold')}
                            size="sm"
                            variant={item.active ? 'link' : 'ghost'}
                            key={itemIdx}
                            asChild
                        >
                            <Link className="flex flex-col" href={item.href} onClick={(e) => handleOnNavigationItemClick(e, item)}>
                                <item.icon className="size-5" />
                                <span className="text-xs">{item.label}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
            <Toaster position="top-center" richColors />
        </>
    );
}
