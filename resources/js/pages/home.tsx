import {
    AuthenticatedLayout,
    AuthenticatedLayoutContent,
    AuthenticatedLayoutHeader,
    AuthenticatedLayoutTitle
} from '@/layouts/authenticated-layout';
import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AuthenticatedLayout>
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutHeader>
                    <AuthenticatedLayoutTitle>Welkom terug, {auth.user.name}</AuthenticatedLayoutTitle>
                </AuthenticatedLayoutHeader>

                <div className="grid gap-4">
                    <Link prefetch="mount" href={route('search')} className="bg-primary col-span-full rounded-lg p-4">
                        <TextHeading className="text-white">Ervaringen toevoegen</TextHeading>
                        <TextParagraph className="text-white">Zoek restaurants en geef aan of je er geweest bent of nog naar toe wilt.</TextParagraph>
                    </Link>
                    <Link prefetch="mount" href={route('search', { tab: 'users' })} className="bg-secondary rounded-lg p-4">
                        <TextHeading className="text-secondary-foreground">Vrienden zoeken</TextHeading>
                        <TextParagraph className="text-secondary-foreground">Anders is het ook maar zo stil hier.</TextParagraph>
                    </Link>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button className="bg-muted rounded-lg p-4 text-left">
                                <TextHeading>Ik heb feedback!</TextHeading>
                                <TextParagraph>Heb je feedback op bestaande of ideën over nieuwe functionaliteiten? Deel ze!</TextParagraph>
                            </button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Inloggen</DrawerTitle>
                                <DrawerDescription>Welkom terug! Via het onderstaande profiel kun je inloggen</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4">
                                <form id="feedback-form">
                                    <Label>Jouw feedback</Label>
                                    <Textarea placeholder="Alles wat je maar kunt verzinnen!" />
                                </form>
                            </div>
                            <DrawerFooter>
                                <Button type="submit" form="feedback-form">
                                    Feedback delen
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
