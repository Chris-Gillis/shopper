import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/Components/ui/button";

const columns: ColumnDef<Models.GroceryList>[] = [
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
            const d = dayjs(row.original.created_at);
            return d.format("L");
        },
    },
    {
        accessorKey: "items_count",
        header: "# Items",
    },
];

export default function Lists({
    auth,
    lists,
    new_route,
}: PageProps<{ lists: Models.GroceryList[]; new_route: string }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lists" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <div>{/* just for spacing */}</div>
                            <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                                Lists
                            </h2>
                            <Button asChild={true}>
                                <a href={new_route}>Add New</a>
                            </Button>
                        </div>
                        <DataTable
                            columns={columns}
                            data={lists}
                            // onRowClick={openMeal}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
