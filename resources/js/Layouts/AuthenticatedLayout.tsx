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
        <div className="grid w-full lg:grid-cols-[280px_1fr]">
            <div className="border-r  lg:block h-screen bg-gray-100/40">
                <div className="flex flex-col gap-2">
                    <div className="flex h-20 gap-2 justify-center items-center border-b px-6">
                        <ApplicationLogo className="w-8 h-8" />
                        <Link
                            className="flex items-center gap-2 font-semibold text-lg"
                            href="/meals"
                        >
                            <span className="">Listerino</span>
                        </Link>
                    </div>
                    <div className="flex-1 py-2">
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
            <main className="max-h-screen overflow-y-auto">{children}</main>
        </div>
    );
}
