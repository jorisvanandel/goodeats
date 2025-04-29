import {
    AuthenticatedLayout,
    AuthenticatedLayoutContent,
    AuthenticatedLayoutHeader,
    AuthenticatedLayoutTitle
} from '@/layouts/authenticated-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';

function FeedbackDrawer({ onOpenChange, ...props } : React.ComponentProps<typeof Drawer>) {
    const { data, setData, post, errors, reset } = useForm<{
        feedback: string;
    }>({
        feedback: ''
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
            }
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
                        <Textarea value={data.feedback} onChange={(e) => setData('feedback', e.target.value)} className="min-h-24" placeholder="Geef hier aan wat GoodEats nóg beter zou maken." />
                        <InputError message={errors.feedback} />
                    </form>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="feedback-form">
                        Feedback delen
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function Banner({ onActionClick }: { onActionClick: () => void; }) {
    return (
        <div
            className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5">
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                    className="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                    className="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
            </div>
            <p className="text-sm/6 text-gray-900">
                Heb je feedback of ideeën over hoe we GoodEats nog beter kunnen maken?{' '}
                <button onClick={onActionClick} className="font-semibold whitespace-nowrap">
                    Laat je horen!&nbsp;<span aria-hidden="true">&rarr;</span>
                </button>
            </p>
        </div>
    )
}

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState<boolean>(false);

    return (
        <AuthenticatedLayout title="Home">
            <Banner onActionClick={() => setFeedbackDrawerOpen(true)}/>
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutHeader>
                    <AuthenticatedLayoutTitle>Welkom terug, {auth.user.name}</AuthenticatedLayoutTitle>
                </AuthenticatedLayoutHeader>

                <div className="grid gap-4">
                    <Link prefetch="mount" href={route('search')} className="bg-muted border border-border col-span-full rounded-lg px-4 py-3">
                        <TextHeading size="sm">Ervaringen toevoegen</TextHeading>
                        <TextParagraph size="sm" className="text-muted-foreground">Zoek restaurants en geef aan of je er geweest bent of nog
                            naar toe wilt.</TextParagraph>
                    </Link>
                    <Link prefetch="mount" href={route('search', { tab: 'users' })} className="bg-muted border-border border rounded-lg px-4 py-3">
                        <TextHeading size="sm">Vrienden zoeken</TextHeading>
                        <TextParagraph size="sm" className="text-muted-foreground">Anders is het ook maar zo stil hier.</TextParagraph>
                    </Link>
                </div>

                <div className="mt-8">
                    <TextHeading>Activiteit</TextHeading>
                    <TextParagraph size="sm" variant="muted">Hier zie je straks wat je vrienden uitspoken!</TextParagraph>
                </div>

                <FeedbackDrawer open={feedbackDrawerOpen} onOpenChange={setFeedbackDrawerOpen} />
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
