'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, UserButton, SignInButton} from "@clerk/nextjs";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className='sidebar'>
            <div className="flex flex-col size-full gap-4">
                <Link href='/' className='sidebar-logo'>
                    <Image
                        src='/assets/images/logo-text.svg'
                        width={180}
                        height={28}
                        alt='logo'
                    />
                </Link>
                <nav className='sidebar-nav'>
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route}
                                        className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}>
                                        <Link className='sidebar-link' href={link?.route}>
                                            <Image
                                                src={link.icon}
                                                width={24}
                                                height={24}
                                                className={isActive ? "brightness-200" : ""}
                                                alt={link.label}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className='sidebar-nav_elements'>
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route}
                                        className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"}`}>
                                        <Link className='sidebar-link' href={link?.route}>
                                            <Image
                                                src={link.icon}
                                                width={24}
                                                height={24}
                                                className={isActive ? "brightness-200" : ""}
                                                alt={link.label}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            <li className="flex-center cursor-pointer gap-2 p-4">
                                <UserButton showName/>
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button className='button bg-purple-gradient bg-cover'>
                                Login
                            </Button>
                        </SignInButton>

                    </SignedOut>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;