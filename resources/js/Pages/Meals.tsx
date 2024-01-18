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
import { Input } from "@/Components/ui/input";

const columns: ColumnDef<Models.Meal>[] = [
    {
        accessorKey: "name",
        header: "Name",
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
            return d.format("L");
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Meals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-5">
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-between items-center py-5">
                                    <div>{/* just for spacing */}</div>
                                    <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                                        Meals
                                    </h2>
                                    <Button className="">Add New</Button>
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={meals}
                                    onRowClick={openMeal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
