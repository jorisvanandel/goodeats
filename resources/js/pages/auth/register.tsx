import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthLayout from '@/layouts/guest-layout';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';

type RegisterForm = {
    email: string;
    password: string;
};

function GoogleIcon({ ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} width="800px" height="800px" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
            <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
            />
            <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
            />
            <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
            />
            <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
            />
        </svg>
    );
}

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
            <div className="px-4 py-12">
                <div>
                    <TextHeading>Account aanmaken</TextHeading>
                    <TextParagraph variant="muted">Vul de gegevens hieronder in om een account te registreren.</TextParagraph>
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
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
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
