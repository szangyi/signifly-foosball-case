"use client"

import React from 'react';
import {
    Box,
    Card,
    Text,
    Grid,
    GridItem
} from "@chakra-ui/react"


export default function Teams() {
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
                    <GridItem w='100%' h='100%' bg='blue.500' >
                        <Card borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                            <Text fontSize={'3xl'} mt={5}>Team Cougar</Text>
                            <Text fontSize={'md'} mt={5}>Justin Timberlake</Text>
                            <Text fontSize={'md'} mt={1}>King Richard</Text>
                        </Card>
                    </GridItem>
                    <GridItem w='100%' h='100%' bg='blue.500' >
                        <Card borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                            <Text fontSize={'3xl'} mt={5}>Team Cougar</Text>
                            <Text fontSize={'md'} mt={5}>Justin Timberlake</Text>
                            <Text fontSize={'md'} mt={1}>King Richard</Text>
                        </Card>
                    </GridItem>
                    <GridItem w='100%' h='100%' bg='blue.500' >
                        <Card borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                            <Text fontSize={'3xl'} mt={5}>Team Cougar</Text>
                            <Text fontSize={'md'} mt={5}>Justin Timberlake</Text>
                            <Text fontSize={'md'} mt={1}>King Richard</Text>
                        </Card>
                    </GridItem>
                    <GridItem w='100%' h='100%' bg='blue.500' >
                        <Card borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                            <Text fontSize={'3xl'} mt={5}>Team Cougar</Text>
                            <Text fontSize={'md'} mt={5}>Justin Timberlake</Text>
                            <Text fontSize={'md'} mt={1}>King Richard</Text>
                        </Card>
                    </GridItem>
                </Grid>

            </Box>

        </>
    )
};



