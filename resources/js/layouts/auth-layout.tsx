import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { type PropsWithChildren } from 'react';

type AuthLayoutProps = {
    title: string;
    description: string;
};

export default function AuthenticatedLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="p-4">
            <Button className="-mx-4" variant="link" asChild>
                <Link href={route('landing')}>
                    <ChevronLeft className="size-6" />
                </Link>
            </Button>
            <div className="mt-4">
                <h1 className="text-text text-3xl font-medium">{title}</h1>
                <p className="text-muted-foreground mt-2 text-lg">{description}</p>
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}
