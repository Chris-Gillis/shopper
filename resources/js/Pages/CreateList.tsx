import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEvent } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import { TrashIcon } from "@heroicons/react/24/solid";

export default function CreateList({
    auth,
    meals,
}: PageProps<{ meals: Models.Meal[] }>) {
    const submit = function (e: FormEvent) {
        e.preventDefault();
    };

    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        amount: "",
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="New List" />
            <div className="w-[80%] mx-auto space-y-8">
                <h1>New Grocery List</h1>
                <h2 className="border-0">Selected (0)</h2>
                <div className="grid grid-cols-3 gap-3 overflow-auto h-full">
                    {meals.map((meal) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-between">
                                        <p className="max-w-56">{meal.name}</p>
                                        <Button className="text-lg">Add</Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {meal.ingredients.map((ingredient) => (
                                    <p className="text-md leading-3">
                                        {ingredient.name}
                                    </p>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="fixed right-1 bottom-1">
                    <TrashIcon />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
