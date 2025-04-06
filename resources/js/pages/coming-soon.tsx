import { Head } from '@inertiajs/react';

export default function ComingSoon() {
    return (
        <>
            <Head title="Coming Soon"/>
            <div className="bg-primary h-screen w-screen flex justify-center pt-70">
                <h1 className="text-3xl uppercase font-medium text-secondary">Coming Soon</h1>
            </div>
        </>
    );
}
