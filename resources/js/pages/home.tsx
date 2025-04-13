import AuthenticatedLayout from '@/layouts/authenticated-layout';

export default function Home() {
    return (
        <AuthenticatedLayout>
            <h2>Home</h2>
        </AuthenticatedLayout>
    );
}
