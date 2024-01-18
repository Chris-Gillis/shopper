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

const columns: ColumnDef<Models.Meal>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "ingredients_count",
        header: "# Ingredients",
        cell: ({ row }) => {
            return row.original.ingredients_count ?? 0;
        },
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
    meals,
}: PageProps<{ meals: Models.Meal[] }>) {
    const openMeal = (meal: Models.Meal) => {
        router.get(meal.route);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Meals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={meals}
                            onRowClick={openMeal}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
