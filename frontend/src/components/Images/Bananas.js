"use client"

import React from 'react';
import img from "../../assets/hugging-bananas.svg"

import {
    Image,
} from "@chakra-ui/react"


export default function Bananas() {
    return (
        <>
            <Image h={{md:'100%'}} src={img} />
        </>
    )
};
