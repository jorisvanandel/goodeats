import InputError from '@/components/input-error';
import { GoogleIcon } from '@/components/oauth-provider-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthLayout from '@/layouts/guest-layout';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';

type RegisterForm = {
    email: string;
    password: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        email: '',
        password: '',
    });

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <AuthLayout title="Account aanmaken">
            <div className="px-4 py-4">
                <div>
                    <TextHeading size="lg">Account aanmaken</TextHeading>
                    <div className="mt-4">
                        <TextParagraph variant="muted">Vul de gegevens hieronder in om een account te registreren.</TextParagraph>
                        <TextParagraph className="mt-2" variant="muted">
                            Door te registreren ga je akkoord met onze{' '}
                            <Link className="text-link" href={route('privacy-policy')}>
                                privacyverklaring
                            </Link>
                            .
                        </TextParagraph>
                    </div>
                </div>
                <form className="mt-5 flex flex-col gap-6" onSubmit={handleOnSubmit}>
                    <div className="grid gap-6">
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
                                placeholder="email@voorbeeld.nl"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={2}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Wachtwoord"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="size-4 animate-spin" />}
                            Registreren
                        </Button>
                    </div>

                    <div className="relative flex h-fit items-center">
                        <div className="bg-background text-muted-foreground absolute left-1/2 -translate-x-1/2 px-2">Of</div>
                        <Separator className="my-auto" />
                    </div>

                    <Button variant="outline" asChild>
                        <a href={route('oauth.google.redirect')}>
                            <GoogleIcon />
                            Registreer met Google
                        </a>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
