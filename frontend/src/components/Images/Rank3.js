"use client"

import React from 'react';
import img from "../../assets/rank-3.svg"

import {
    Image,
} from "@chakra-ui/react"


export default function Rank3({size}) {
    return (
        <>
            <Image boxSize={size} src={img} />
        </>
    )
};
