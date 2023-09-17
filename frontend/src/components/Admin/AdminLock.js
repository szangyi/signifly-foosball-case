"use client"

import React from 'react';

import { UnlockIcon, LockIcon } from '@chakra-ui/icons'

import {
    IconButton
} from "@chakra-ui/react"

export default function AdminLock() {
    return (
        <>
            <IconButton
                aria-label='Change data as admin'
                icon={<UnlockIcon />}
                position={'fixed'}
                right={0}
                bottom={0}
            />
        </>
    )
};
