"use client"

import React from 'react';
import img from "../../assets/rank-2.svg"

import {
    Image,
} from "@chakra-ui/react"


export default function Rank2({size}) {
    return (
        <>
            <Image boxSize={size} src={img} />
        </>
    )
};
