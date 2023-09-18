"use client"

import React from 'react';
import {
    Card,
    Grid,
    GridItem
} from "@chakra-ui/react"

export default function Home() {

    const initialIsAdminLoggedin = localStorage.getItem('isAdminLoggedinStored');
    console.log(`local storage admin: ` + initialIsAdminLoggedin)


    return (
        <>
            <h1> that's the homepage </h1>
        </>
    )
};



