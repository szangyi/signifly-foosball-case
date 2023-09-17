"use client"

import React from 'react';
import logo from '../../assets/logo.svg';
import {
    Image,
    Link
} from "@chakra-ui/react"

export default function Logo() {
    return (
        <>
            <Link href="/">
                <Image src={logo}/>
            </Link>
        </>
    )
};
