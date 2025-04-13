import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { useState } from 'react';

export default function Profile() {
    const [loading, setLoading] = useState<boolean>(true);

    const activities = [
        { user: 'Joris van Andel', description: 'Heeft Cafe Caron geliked.', time: '4u geleden' },
        { user: 'Sophie de Ruiter', description: 'Is je gaan volgen', time: '5u geleden' },
        { user: 'Joris van Andel', description: 'Heeft Scheepskameel geliked.', time: '12u geleden' },
        { user: 'Bram van Gelder', description: 'Is je gaan volgen', time: '2 dagen geleden' },
        { user: 'Kees van der Spek', description: 'Heeft Cafe de Zoldering geliked.', time: '1 week geleden' },
        { user: 'Daan Ferdinandusse', description: 'Is je gaan volgen', time: '2 weken geleden' },
    ];

    setTimeout(() => setLoading(false), 500);
    return (
        <AuthenticatedLayout title="Activiteit">
            <div className="grid gap-y-3">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-16" />)
                ) : (
                    <div className="divide-divide divide-y">
                        {activities.map((activity, activityIdx) => (
                            <div key={activityIdx} className="flex gap-3 py-3">
                                <Avatar className="size-10">
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <TextHeading size="sm">{activity.user}</TextHeading>
                                    <TextParagraph variant="muted">{activity.description}</TextParagraph>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
