import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/Components/ui/button";

import { ArrowUpDown } from "lucide-react";

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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {meal.name}
                </h2>
            }
        >
            <Head title={meal.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={meal.ingredients}
                            showPagination={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
