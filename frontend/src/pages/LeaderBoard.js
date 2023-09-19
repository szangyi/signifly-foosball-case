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
    const [teamsData, setTeamsData] = useState();

    function sortByKey(array, key) {
        return array.sort((a, b) => {
            const x = a[key];
            const y = b[key];
            return x > y ? -1 : x < y ? 1 : 0;
        });
    }

    useEffect(() => {
        TeamsGetAll((data) => {
            const sortedData = sortByKey(data, 'games_points')
            setTeamsData(sortedData);
        });
    }, []);


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

        </>
    )
};