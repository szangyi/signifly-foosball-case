"use client"

import React, { useEffect, useState } from 'react';
import TeamsGetAll from '../features/TeamsGetAll.js';

import {
    Box,
    Card,
    Text,
    Grid,
    GridItem
} from "@chakra-ui/react"


export default function Teams() {

    const [profilesData, setProfilesData] = useState(null);

    useEffect(() => {
        TeamsGetAll(setProfilesData)
    }, [])

    console.log(profilesData)

    return (
        <>

            <Box mx={{ base: 5, md: 12 }}>

                <Text fontSize={'6xl'} mt={10} >
                    Teams
                </Text>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    templateRows={{ base: '8fr', md: 'repeat(4, 1fr)', lg: 'repeat(2, 1fr)' }}
                    gap={20}
                    mt={20}
                >

                    {profilesData && (
                        profilesData.map((profile) => (
                            <GridItem key={profile[0]} w='100%' h='100%' bg='blue.500' >
                                <Card h={'100%'} borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                                    <Text fontSize={'3xl'} mt={5}>{profile[1]}</Text>
                                    <Text fontSize={'md'} mt={5}>{profile[2]}</Text>
                                    <Text fontSize={'md'} mt={5}>{profile[3]}</Text>
                                </Card>
                            </GridItem>
                        ))
                    )
                    }


                </Grid>

            </Box>

        </>
    )
};



