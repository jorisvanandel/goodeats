import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextParagraph } from '@/components/ui/text';
import {
    AuthenticatedLayoutContent,
    AuthenticatedLayoutDescription,
    AuthenticatedLayoutHeader,
    AuthenticatedLayoutTitle,
} from '@/layouts/authenticated-layout';
import GuestLayout from '@/layouts/guest-layout';
import type { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent } from 'react';

type FinishProfileForm = {
    username: string;
    name: string;
    avatar: File | null;
};

export default function FinishProfilePage() {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing } = useForm<FinishProfileForm>({
        username: auth.user.username,
        name: auth.user.name ?? '',
        avatar: null,
    });

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('finish-profile.store'));
    }

    function handleOnUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const trimmedValue = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');

        setData('username', trimmedValue);
    }

    return (
        <GuestLayout title="Profiel afronden">
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutHeader>
                    <AuthenticatedLayoutTitle>Voordat je verder gaat...</AuthenticatedLayoutTitle>
                    <AuthenticatedLayoutDescription>Maak je profiel af zodat je straks goed vindbaar bent!</AuthenticatedLayoutDescription>
                </AuthenticatedLayoutHeader>
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Gebruikersnaam</Label>
                        <Input id="username" type="text" name="username" tabIndex={1} value={data.username} onChange={handleOnUsernameChange} />
                        {errors.username ? (
                            <InputError message={errors.username} />
                        ) : (
                            <TextParagraph size="sm" variant="muted">
                                Jouw profiel staat straks op: goodeats.nl/{data.username}
                            </TextParagraph>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Volledige naam</Label>
                        <Input id="name" type="text" name="name" value={data.name} tabIndex={2} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        <Input
                            id="avatar"
                            type="file"
                            name="avatar"
                            tabIndex={3}
                            onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                        />
                        <InputError message={errors.avatar} />
                    </div>

                    <Button disabled={processing} className="w-full" type="submit">
                        {processing && <LoaderCircle className="size-4 animate-spin" />}
                        Opslaan
                    </Button>
                </form>
            </AuthenticatedLayoutContent>
        </GuestLayout>
    );
}
