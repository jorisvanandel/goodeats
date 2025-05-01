import { Toaster } from '@/components/ui/sonner';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

type RootLayoutProps = PropsWithChildren & { title?: string };

function RootLayout({ children, title }: RootLayoutProps) {
    return (
        <>
            <Head title={title}>
                <meta name="description" content="GoodEats - Dé nieuwe plek om culinaire hotspots te delen met je vrienden!" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="GoodEats - Dé nieuwe plek om culinaire hotspots te delen met je vrienden!" />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://www.goodeats.nl" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            {children}
            <Toaster position="top-center" />
        </>
    );
}

export { RootLayout };
