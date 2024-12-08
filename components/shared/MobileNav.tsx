'use client'
import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {navLinks} from "@/constants";
import React from "react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

function MobileNav() {
    const pathname = usePathname()
    return (
        <header className='header'>
            <Link
                href='/'
                className='flex items-center gap-2 md:py-2'
            >
                <Image
                    src='/assets/images/logo-text.svg'
                    width={180}
                    height={28}
                    alt='logo'
                />
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton/>
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src='/assets/icons/menu.svg'
                                width={32}
                                height={32}
                                alt='menu'
                                className='cursor-pointer'
                            />
                        </SheetTrigger>
                        <SheetContent className='sheet-content sm:w-64'>
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                                <SheetDescription>
                                </SheetDescription>
                            </SheetHeader>
                            <>
                                <Image
                                    src='/assets/images/logo-text.svg'
                                    width={152}
                                    height={23}
                                    alt='logo'
                                />
                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname
                                        return (
                                            <li key={link.route}
                                                className={`p-18 flex whitespace-nowrap text-dark-700 ${isActive ? "gradient-text" : ""}`}>
                                                <Link className='sidebar-link cursor-pointer' href={link?.route}>
                                                    <Image
                                                        src={link.icon}
                                                        width={24}
                                                        height={24}
                                                        alt={link.label}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button className='button bg-purple-gradient bg-cover'>
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
            </nav>
        </header>
    );
}

export default MobileNav;