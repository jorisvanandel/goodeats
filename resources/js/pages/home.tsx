import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { AuthenticatedLayout, AuthenticatedLayoutContent, AuthenticatedLayoutHeader, AuthenticatedLayoutTitle } from '@/layouts/authenticated-layout';
import type { SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

function FeedbackDrawer({ onOpenChange, ...props }: React.ComponentProps<typeof Drawer>) {
    const { data, setData, post, errors, reset } = useForm<{
        feedback: string;
    }>({
        feedback: '',
    });

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('feedback'), {
            onSuccess: () => {
                if (onOpenChange !== undefined) {
                    onOpenChange(false);
                }

                reset();
                toast.success('Je feedback is goed ontvangen. Enorm bedankt!');
            },
        });
    }

    return (
        <Drawer {...props} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Feedback delen</DrawerTitle>
                    <DrawerDescription>Heb je feedback of ideeën over hoe we GoodEats nog beter kunnen maken? Laat het weten!</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <form id="feedback-form" onSubmit={handleOnSubmit}>
                        <Textarea
                            value={data.feedback}
                            onChange={(e) => setData('feedback', e.target.value)}
                            className="min-h-24"
                            placeholder="Geef hier aan wat GoodEats nog beter zou maken."
                        />
                        <InputError message={errors.feedback} />
                    </form>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="feedback-form">
                        Versturen
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState<boolean>(false);

    return (
        <AuthenticatedLayout title="Home">
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutHeader>
                    <AuthenticatedLayoutTitle>Welkom terug, {auth.user.name}</AuthenticatedLayoutTitle>
                </AuthenticatedLayoutHeader>

                <div className="grid gap-4">
                    <div className="bg-gradient-to-tr from-fuchsia-100 to-pink-100 rounded-lg px-4 py-3">
                        <TextHeading size="sm">Heb je feedback?</TextHeading>
                        <TextParagraph size="sm">
                            Help ons GoodEats te verbeteren door je ideën of feedback te delen met ons.
                        </TextParagraph>
                        <div className="mt-2">
                            <Button onClick={() => setFeedbackDrawerOpen(true)} size="sm" className="rounded-full bg-zinc-950 hover:bg-zinc-800">Feedback delen</Button>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Link prefetch="mount" href={route('search')}>
                            <TextHeading size="sm">Restaurants toevoegen &rarr;</TextHeading>
                        </Link>
                        <Link prefetch="mount" href={route('search', { tab: 'users' })}>
                            <TextHeading size="sm">Vrienden toevoegen &rarr;</TextHeading>
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <TextHeading>Activiteit</TextHeading>
                    <TextParagraph size="sm" variant="muted">
                        Hier zie je straks wat je vrienden uitspoken!
                    </TextParagraph>
                </div>

                <FeedbackDrawer open={feedbackDrawerOpen} onOpenChange={setFeedbackDrawerOpen} />
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
