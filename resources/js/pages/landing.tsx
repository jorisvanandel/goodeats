import InputError from '@/components/input-error';
import { GoogleIcon } from '@/components/oauth-provider-icons';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import GuestLayout from '@/layouts/guest-layout';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

function LoginDrawer() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="secondary">Inloggen</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Inloggen</DrawerTitle>
                    <DrawerDescription>Welkom terug! Via het onderstaande profiel kun je inloggen</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    <form className="grid gap-4" id="login-form" action="" onSubmit={handleOnSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Emailadres</Label>
                            <Input
                                id="email"
                                type="email"
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="info@voorbeeld.nl"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={2}
                                autoComplete="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Wachtwoord"
                            />
                            <InputError message={errors.password} />
                        </div>
                    </form>

                    <div className="relative flex h-fit items-center py-5">
                        <div className="bg-background text-muted-foreground absolute left-1/2 -translate-x-1/2 px-2">Of</div>
                        <Separator className="my-auto" />
                    </div>

                    <Button className="w-full" variant="outline" asChild>
                        <a href={route('oauth.google.redirect')}>
                            <GoogleIcon />
                            Log in met Google
                        </a>
                    </Button>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="login-form">
                        Inloggen
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function LandingPage() {
    return (
        <GuestLayout
            title="Home"
            className="flex bg-[url(/images/landing-page-background-2.jpg)] bg-cover pt-[33vh] before:absolute before:inset-0 before:z-[-5] before:block before:bg-linear-to-b before:via-zinc-700 before:to-zinc-950 before:opacity-75 before:content-['']"
        >
            <div className="flex w-full flex-col justify-between px-3 pb-8">
                <div>
                    <h1 className="text-secondary text-5xl font-semibold">Welkom bij GoodEats!</h1>
                    <p className="text-secondary mt-4">
                        GoodEats is dé nieuwe plek om culinaire hotspots te delen met je vrienden. Meld je aan via de onderstaande link of log in om
                        naar je profiel te gaan.
                    </p>
                </div>
                <div className="grid gap-y-3">
                    <LoginDrawer />
                    <Button asChild>
                        <Link prefetch="mount" href={route('register')}>
                            Registreren
                        </Link>
                    </Button>
                </div>
            </div>
        </GuestLayout>
    );
}
