"use client"

import React from 'react';
import img from "../../assets/rank-1.svg"

import {
    Image,
} from "@chakra-ui/react"


export default function Rank1({size}) {
    return (
        <>
            <Image boxSize={size} src={img} />
        </>
    )
};
