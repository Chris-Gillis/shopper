import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FormEvent, useRef } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const columns: ColumnDef<Models.Ingredient>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <span className="text-lg">{row.original.name}</span>;
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return <span className="text-lg">{row.original.amount}</span>;
        },
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            return actionColumn(row.original);
        },
    },
];

function actionColumn(ingredient: Models.Ingredient) {
    return (
        <TrashIcon
            className="cursor-pointer h-8 w-8"
            onClick={() =>
                router.delete(
                    route("meals.ingredients.destroy", [
                        ingredient.meal_id,
                        ingredient.id,
                    ])
                )
            }
        />
    );
}

export default function MealDetails({
    auth,
    meal,
}: PageProps<{ meal: Models.Meal }>) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        amount: "",
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = function (e: FormEvent) {
        e.preventDefault();
        post(route("meals.ingredients.store", meal.id), {
            onSuccess: () => {
                reset();
                inputRef.current?.focus();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={meal.name} />
            <div className="p-12">
                <h1 className="text-center h-24">{meal.name}</h1>
                <div className="flex flex-wrap gap-8">
                    <div className="w-60 space-y-5">
                        <h2>Add Ingredients</h2>
                        <form className="space-y-5" onSubmit={submit}>
                            <div className=" flex flex-col gap-3">
                                <Label
                                    htmlFor="ingredient_name"
                                    className="text-xl"
                                >
                                    Name
                                </Label>
                                <Input
                                    ref={inputRef}
                                    data-1p-ignore
                                    id="ingredient_name"
                                    name="ingredient_name"
                                    autoComplete="off"
                                    type="text"
                                    className="text-black text-lg"
                                    placeholder="Spahgetti"
                                    value={data.name}
                                    autoFocus
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className=" flex flex-col gap-3">
                                <Label htmlFor="amount" className="text-md">
                                    Amount
                                </Label>
                                <Input
                                    data-1p-ignore
                                    id="amount"
                                    name="amount"
                                    autoComplete="off"
                                    type="text"
                                    className="text-black text-lg"
                                    placeholder="4 oz"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                className="w-full text-2xl"
                                disabled={processing}
                            >
                                Save
                            </Button>
                        </form>
                    </div>
                    <div className="flex-1">
                        <DataTable
                            columns={columns}
                            data={meal.ingredients!}
                            showPagination={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
