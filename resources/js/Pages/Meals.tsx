import { FormEvent } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

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
    new_route,
}: PageProps<{ meals: Models.Meal[]; new_route: string }>) {
    const openMeal = (meal: Models.Meal) => {
        router.get(meal.route);
    };

    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(new_route, { onSuccess: () => reset("name") });
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Meals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <div>{/* just for spacing */}</div>
                            <h2 className="font-semibold text-3xl text-gray-800 leading-tight">
                                Meals
                            </h2>
                            <Dialog>
                                <DialogTrigger>
                                    <span className="default-btn">Add New</span>
                                </DialogTrigger>
                                <DialogContent>
                                    <form
                                        onSubmit={submit}
                                        className="flex flex-col gap-3"
                                    >
                                        <Label
                                            htmlFor="meal-name"
                                            className="text-xl"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            autoComplete="off"
                                            type="text"
                                            className="text-black text-lg"
                                            placeholder="Avocado Toast"
                                            name="meal_name"
                                            value={data.name}
                                            autoFocus
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <Button type="submit">Save</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
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
