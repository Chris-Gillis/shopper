import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";

const columns: ColumnDef<Models.Ingredient>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
            const d = dayjs(row.original.created_at);
            return d.format("L LT");
        },
    },
];

export default function Meals({
    auth,
    meal,
}: PageProps<{ meal: Models.Meal }>) {
    const openMeal = (meal: Models.Meal) => {
        router.get(meal.route);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={meal.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center">{meal.name}</h2>
                    <DataTable
                        columns={columns}
                        data={meal.ingredients}
                        showPagination={false}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
