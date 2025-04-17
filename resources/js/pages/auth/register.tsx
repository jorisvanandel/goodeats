import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/guest-layout';
import { TextHeading, TextParagraph } from '@/components/ui/text';

type RegisterForm = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Account aanmaken">
            <div className="py-12">
                <div>
                    <TextHeading>Account aanmaken</TextHeading>
                    <TextParagraph variant="muted">Vul de gegevens hieronder in om een account te registreren.</TextParagraph>
                </div>
                <form className="mt-5 flex flex-col gap-6" onSubmit={handleOnSubmit}>
                    <div className="grid gap-6">
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
                                placeholder="Volledige naam"
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
                                placeholder="email@voorbeeld.nl"
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
                                placeholder="Wachtwoord"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Registreren
                        </Button>
                    </div>

                    <div className="text-muted-foreground text-center text-sm">
                        Heb je al een account?{' '}
                        <TextLink href={route('landing')} tabIndex={6}>
                            Log in
                        </TextLink>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
