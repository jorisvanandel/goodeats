import { AuthenticatedLayout, AuthenticatedLayoutContent, AuthenticatedLayoutTitle } from '@/layouts/authenticated-layout';

export default function ActivityPage() {
    return (
        <AuthenticatedLayout title="Activiteit">
            <AuthenticatedLayoutContent>
                <AuthenticatedLayoutTitle>Activiteit</AuthenticatedLayoutTitle>
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
