import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TextHeading } from '@/components/ui/text';
import { Link } from '@inertiajs/react';

export default function Profile() {
    const user = {
        name: 'Joris van Andel',
    };
    return (
        <div className="relative flex flex-col items-center px-4 py-16">
            <Button size="sm" className="absolute top-5 right-4" variant="outline" asChild>
                <Link href={route('account')}>Bewerk profiel</Link>
            </Button>
            <Avatar className="size-24">
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <TextHeading className="mt-4">{user.name}</TextHeading>
            <Card className="divide-divide mt-5 flex w-full flex-row gap-0 divide-x">
                <div className="flex w-1/3 flex-col text-center">
                    <span>53</span>
                    <span>Likes</span>
                </div>
                <div className="flex w-1/3 flex-col text-center">
                    <span>81</span>
                    <span>Volgend</span>
                </div>
                <div className="flex w-1/3 flex-col text-center">
                    <span>120</span>
                    <span>Volgers</span>
                </div>
            </Card>
        </div>
    );
}
