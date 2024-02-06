import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { TrashIcon } from "@heroicons/react/24/outline";
import Checkbox from "@/Components/Checkbox";

const columns: ColumnDef<Models.GroceryListItem>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <span
                    className={`text-lg ${
                        row.original.is_checked ? "line-through" : ""
                    }`}
                >
                    {row.original.name}
                </span>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return <span className="text-lg">{row.original.amount}</span>;
        },
    },
];

export default function ListDetails({
    auth,
    list,
}: PageProps<{ list: Models.GroceryList }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={list.name} />
            <div className="p-12 flex flex-col items-center">
                <h1 className="text-center">{list.name}</h1>
                <em className="text-lg py-5">Check box to exclude item</em>
                <DataTable
                    onRowSelect={(row) =>
                        (row.original.is_checked = !row.original.is_checked)
                    }
                    columns={columns}
                    data={list.items}
                    showPagination={false}
                />
            </div>
        </AuthenticatedLayout>
    );
}
