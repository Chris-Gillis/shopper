import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEvent, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import { CheckCircleIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Input } from "@/Components/ui/input";

export default function CreateList({
    auth,
    meals,
}: PageProps<{ meals: Models.Meal[] }>) {
    const panel = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<number[]>([]);
    const [name, setName] = useState<string>("New Grocery List");
    const [editName, setEditName] = useState<boolean>(false);

    const selectMeal = function (meal: Models.Meal) {
        setSelected(selected.concat(meal.id));
    };

    const deselectMeal = function (meal: Models.Meal) {
        setSelected(selected.filter((id) => id !== meal.id));
    };

    const scrollUp = function () {
        panel.current?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updateName = function (e: FormEvent) {
        e.preventDefault();

        setEditName(false);
    };

    const save = function () {
        router.post(route("lists.store"), {
            meal_ids: selected,
            name: name,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="New List" />
            <div className="w-[80%] mx-auto space-y-8 mt-[2rem]" ref={panel}>
                <div className="flex items-center gap-5">
                    {editName && (
                        <>
                            <form
                                onSubmit={updateName}
                                method="POST"
                                className="flex flex-row items-center gap-5 w-full"
                            >
                                <Input
                                    data-1p-ignore
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="scroll-m-20 text-xl max-w-7xl w-1/2 "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <CheckCircleIcon
                                    className="h-10 w-10 cursor-pointer text-green-700"
                                    onClick={() => setEditName(!editName)}
                                ></CheckCircleIcon>
                            </form>
                        </>
                    )}
                    {!editName && (
                        <>
                            <h1 className="max-w-7xl">{name}</h1>
                            <span>
                                <PencilSquareIcon
                                    className="h-8 w-8 cursor-pointer"
                                    onClick={() => setEditName(!editName)}
                                />
                            </span>
                        </>
                    )}
                </div>
                <div className="flex justify-between">
                    <h2 className="border-0">Selected ({selected.length})</h2>
                    <Button className="text-lg" onClick={save}>
                        Save
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-3 overflow-auto h-full">
                    {meals.map((meal) => (
                        <Card key={`${meal.id}-${meal.name}`}>
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-between">
                                        <p className="max-w-56">{meal.name}</p>
                                        {selected.indexOf(meal.id) === -1 && (
                                            <Button
                                                className="text-lg"
                                                onClick={() => selectMeal(meal)}
                                            >
                                                Add
                                            </Button>
                                        )}
                                        {selected.indexOf(meal.id) !== -1 && (
                                            <Button
                                                className="text-lg"
                                                onClick={() =>
                                                    deselectMeal(meal)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {meal.ingredients.map((ingredient) => (
                                    <p
                                        key={`${ingredient.id}-ingredient`}
                                        className="text-md leading-3"
                                    >
                                        {ingredient.name}
                                    </p>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="fixed bottom-2 right-6">
                    <Button onClick={scrollUp}>
                        <ChevronUpIcon className="h-8 w-8" />
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
