"use client";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Archive, BadgeDollarSign, Clipboard, Layout, LucideIcon, Menu, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinksProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinksProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");
    return (
        <Link href={href}>
            <div
                className={`cursor-pointer flex items-center ${
                    isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
                } hover:text-blue-500 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}
            >
                <Icon className="w-6 h-6 !text-gray-700" />
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
            </div>
        </Link>
    );
};

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const sidebarClassname = `fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
        <div className={sidebarClassname}>
            {/* TOP LOGO */}
            <div
                className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
                    isSidebarCollapsed ? "px-5" : "px-8"
                }`}
            >
                {!isSidebarCollapsed && (
                    <Image
                        alt="Avatar"
                        src={"/images/kaiju.jpg"}
                        width={30}
                        height={30}
                        className="object-cover rounded-full size-10"
                    />
                )}

                <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>GONC</h1>

                <button
                    className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>

            {/* LINKS */}
            <div className="flex-grow mt-8">
                <SidebarLink href="/dashboard" label="Dashboard" icon={Layout} isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/inventory" label="Inventory" icon={Archive} isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/products" label="Products" icon={Clipboard} isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/users" label="Users" icon={User} isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/settings" label="Settings" icon={Settings} isCollapsed={isSidebarCollapsed} />
                <SidebarLink
                    href="/expenses"
                    label="Expenses"
                    icon={BadgeDollarSign}
                    isCollapsed={isSidebarCollapsed}
                />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} pb-10`}>
                <p className="text-center text-xs text-gray-500">&copy; 2024 GONC</p>
            </div>
        </div>
    );
};

export default Sidebar;
