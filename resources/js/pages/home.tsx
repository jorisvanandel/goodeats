import { AuthenticatedLayout, AuthenticatedLayoutContent } from '@/layouts/authenticated-layout';

export default function Home() {
    return (
        <AuthenticatedLayout>
            <AuthenticatedLayoutContent>
                <h2>Home</h2>
            </AuthenticatedLayoutContent>
        </AuthenticatedLayout>
    );
}
