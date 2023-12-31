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
    Hide,
    Show,
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import TeamsGetAll from '../features/TeamsGetAll';
import Rank1 from '../components/Images/Rank1';
import Rank2 from '../components/Images/Rank2';
import Rank3 from '../components/Images/Rank3';

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

                <Text fontSize={{ base: '3xl', md: '6xl' }} mt={10}>
                    Leaderboard
                </Text>

                <TableContainer>
                    <Table size='sm' variant="striped">

                        <Thead>
                            <Tr >
                                <Th> </Th>
                                <Show breakpoint='(min-width: 700px)'>
                                    <Th> </Th>
                                </Show>
                                <Th> </Th>
                                <Th ><Text fontSize={{ base: 'xs', md: 'md' }}>Won</Text></Th>
                                <Th ><Text fontSize={{ base: 'xs', md: 'md' }}>Lost</Text></Th>
                                <Th ><Text fontSize={{ base: 'xs', md: 'md' }}>Points</Text></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* View & edit teams */}
                            {teamsData &&
                                teamsData.map((team, teamIndex) => (
                                    <Tr key={team.id} id={team.id}>
                                        <Td h={'60px'} ><Text fontWeight={'700'} fontSize={{ base: 'sm', md: 'md' }} >#{teamIndex + 1}</Text></Td>
                                        <Show breakpoint='(min-width: 700px)'>
                                            <Td h={'60px'} >
                                                {teamIndex + 1 === 1 && <Rank1 size={'50px'} />}
                                                {teamIndex + 1 === 2 && <Rank2 size={'50px'} />}
                                                {teamIndex + 1 === 3 && <Rank3 size={'50px'} />}
                                            </Td>
                                        </Show>
                                        <Td h={'60px'} ><Text fontSize={{ base: 'xs', md: 'md' }}>{team.team_name} </Text></Td>
                                        <Td h={'60px'} ><Text fontSize={{ base: 'xs', md: 'md' }}>{team.games_won} </Text></Td>
                                        <Td h={'60px'} ><Text fontSize={{ base: 'xs', md: 'md' }}>{team.games_lost} </Text></Td>
                                        <Td h={'60px'} ><Text fontSize={{ base: 'xs', md: 'md' }} fontWeight={'700'}>{team.games_points} </Text></Td>
                                    </Tr>

                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>


            </Box>

        </>
    )
};