import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function CreateList({ auth }: PageProps<{}>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="New List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="">
                        <h1>Yo dawg</h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
