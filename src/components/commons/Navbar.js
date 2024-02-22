import React from "react"
import Link from 'next/link';
import { Navbar } from 'flowbite-react';
const NavbarComponent = () => {
    return (
        <Navbar fluid rounded className="pb-10">
            <Navbar.Brand as={Link} href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Products
                </Navbar.Link>
                <Navbar.Link href="/" active>
                    Stores
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavbarComponent