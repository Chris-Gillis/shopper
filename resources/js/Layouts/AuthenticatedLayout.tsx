import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-20 gap-2 justify-center items-center border-b px-6">
                        <ApplicationLogo className="w-8 h-8" />
                        <Link
                            className="flex items-center gap-2 font-semibold text-lg"
                            href="#"
                        >
                            <span className="">Listerino</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-lg font-medium">
                            <NavLink
                                active={route().current("meals")}
                                href="/meals"
                            >
                                Meals
                            </NavLink>
                            <NavLink
                                active={route().current("lists")}
                                href="/lists"
                            >
                                Grocery Lists
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
