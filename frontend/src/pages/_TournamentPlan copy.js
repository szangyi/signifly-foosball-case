"use client"

import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Grid,
    GridItem,
    Text,
    Card,
    Input,
} from '@chakra-ui/react';
import GamesGetAll from '../features/GamesGetAll';


export default function TournamentPlan() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [gamesData, setGamesData] = useState(null);

    console.log(gamesData)

    useEffect(() => {
        GamesGetAll((data) => {
            // Initialize editedData with the same data
            // setEditedData(data);
            setGamesData(data);
        });
    }, []);

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} pb={'30dvh'}>

                <Grid
                    mt={10}

                    gridTemplateColumns={{
                        base: 'repeat(3, 1fr)',
                        md: 'repeat(5, 1fr)'
                    }}
                    gridTemplateRows={{
                        base: 'repeat(3, 1fr)',
                        md: '1fr'
                    }}
                >

                    <GridItem
                        border={'1px solid black'}
                        colStart={{ base: 1, md: 1 }}
                        colEnd={{ base: 3, md: 1 }}
                        rowStart={{ base: 1, md: 1 }}
                        rowEnd={{ base: 1, md: 1 }}
                    >
                        <Text fontSize={'sm'}>Tournament Plan</Text>
                    </GridItem>
                    <GridItem
                        border={'1px solid black'}
                        colStart={{ base: 1, md: 2 }}
                        colEnd={{ base: 1, md: 2 }}
                        rowStart={{ base: 2, md: 1 }}
                        rowEnd={{ base: 2, md: 1 }}
                    >
                        <Text fontSize={'sm'}>Team1</Text>
                    </GridItem>
                    <GridItem
                        border={'1px solid black'}
                        colStart={{ base: 2, md: 3 }}
                        colEnd={{ base: 2, md: 3 }}
                        rowStart={{ base: 2, md: 1 }}
                        rowEnd={{ base: 2, md: 1 }}
                    >
                        <Text fontSize={'sm'}>score</Text>
                    </GridItem>
                    <GridItem
                        border={'1px solid black'}
                        colStart={{ base: 3, md: 4 }}
                        colEnd={{ base: 3, md: 4 }}
                        rowStart={{ base: 2, md: 1 }}
                        rowEnd={{ base: 2, md: 1 }}
                    >
                        <Text fontSize={'sm'}>Team2</Text>
                    </GridItem>
                    <GridItem
                        border={'1px solid black'}
                        colStart={{ base: 1, md: 5 }}
                        colEnd={{ base: 1, md: 5 }}
                        rowStart={{ base: 3, md: 1 }}
                        rowEnd={{ base: 3, md: 1 }}
                    >
                    </GridItem>


                </Grid>

            </Box>
        </>
    )
};



