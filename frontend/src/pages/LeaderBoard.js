"use client"
import React, { useState, useEffect } from 'react';

import {
    Flex,
    Button,
    Box,
    Table,
    Text,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import TeamsGetAll from '../features/TeamsGetAll';

export default function LeaderBoard() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [teamsData, setTeamsData] = useState(null);

    useEffect(() => {
        TeamsGetAll((data) => {
            setTeamsData(data);
        });
    }, []);


    const submitChangeHandler = () => {
        // Send editedData to your backend API here
        // console.log('Edited Data:', editedData);
        // TeamUpdateAPI(editedData)
        console.log('just submit')
    };

    console.log(teamsData)

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} mtpb={'30dvh'}>

                <Text fontSize={'6xl'} mt={10}>
                    Leaderboard
                </Text>

                <TableContainer>
                    <Table size='sm'>

                        <Thead>
                            <Tr>
                                <Th> </Th>
                                <Th> </Th>
                                <Th> </Th>
                                <Th>Won</Th>
                                <Th>Lost</Th>
                                <Th>Points</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* View & edit teams */}
                            {teamsData &&
                                teamsData.map((team, teamIndex) => (
                                    <Tr key={team.id} id={team.id}>
                                        <Td><Text>rank</Text></Td>
                                        <Td>image</Td>
                                        <Td><Text>{team.team_name} </Text></Td>
                                        <Td><Text>{team.games_won} </Text></Td>
                                        <Td><Text>{team.games_lost} </Text></Td>
                                        <Td><Text>{team.games_points} </Text></Td>
                                    </Tr>

                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>


            </Box>

            {isAdminLoggedinStored && (
                <Flex direction={'column'} position={'fixed'} right={0} bottom={10} alignItems={'flex-end'}>
                    <Button
                        onClick={submitChangeHandler}
                        backgroundColor={'#FEC7D4'}
                        rightIcon={<EditIcon />}
                        variant='solid'
                    >
                        Save changes
                    </Button>
                </Flex>
            )}
        </>
    )
};