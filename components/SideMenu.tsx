"use client";
import { logout, userdetails } from "@/app/actions/user";
import { useEffect, useState } from "react";
import { FiLogOut, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export const SideMenu = ({ toggleMenu }: { toggleMenu?: () => void }) => {
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userdetails();

                if (userData && "name" in userData) {
                    setUser(userData as { name: string });
                } else {
                    console.error("Failed to fetch user");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async() => {
        await logout(); 
        window.location.href = "/login";
    };

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-50 w-64 h-screen bg-white border-r border-gray-200 sm:translate-x-0 flex flex-col shadow-lg"
            aria-label="Sidebar"
            >
            {toggleMenu && (
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                >
                    <FiX className="text-gray-800 text-2xl" />
                </button>
            )}
            <div className="flex items-center p-5 border-b border-gray-200 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 pr-1">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <h1 className="text-xl font-semibold text-gray-900">Snippet Library</h1>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4 bg-white">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 24 24">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            <span className="ms-3">Home</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="border-t border-gray-200 px-3 py-4 bg-white">
                <div className="flex items-center mb-3">
                    <Image
                        src="https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"
                        alt={`${user ? user.name : "Guest"}'s avatar`}
                        width={28}
                        height={28}
                        priority
                        className="rounded-full"
                    />
                    <span className="ms-3 text-sm text-gray-800">{user ? user.name : "Guest"}</span>
                </div>
                <button
                    className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 flex items-center justify-center"
                    onClick={handleLogout}
                >
                    <FiLogOut className="mr-2" /> Logout
                </button>
            </div>
        </aside>

    );
};
