import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, PropsWithChildren } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

type RegisterForm = {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
};

function LoginDrawer() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

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

function RegisterDrawer() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Registreren</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Registreren</DrawerTitle>
                    <DrawerDescription>Welkom! Je bent enkele stappen verwijderd van je persoonlijke profiel.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    <form className="grid gap-4" id="register-form" action="" onSubmit={handleOnSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Naam</Label>
                            <Input
                                id="name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Emailadres</Label>
                            <Input
                                id="email"
                                type="email"
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Gebruikersnaam</Label>
                            <Input
                                id="username"
                                type="text"
                                tabIndex={3}
                                autoComplete="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.username} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Wachtwoord herhalen</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                tabIndex={5}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="register-form">
                        Registreren
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Home({ children }: PropsWithChildren) {
    return (
        <div className="relative z-10 mx-auto flex h-dvh w-screen max-w-md justify-center bg-[url(/images/landing-page-background-2.jpg)] bg-cover pt-[33vh] before:absolute before:inset-0 before:z-[-5] before:block before:bg-linear-to-b before:via-zinc-700 before:to-zinc-950 before:opacity-75 before:content-['']">
            {children}
            <Head title="Welkom" />;
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
                    <RegisterDrawer />
                </div>
            </div>
        </div>
    );
}
