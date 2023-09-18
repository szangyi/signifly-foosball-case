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
    Card,
    Input,
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
    Select,
} from '@chakra-ui/react';
import GamesGetAll from '../features/GamesGetAll';
import TeamsGetAll from '../features/TeamsGetAll';


export default function TournamentPlan() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [gamesData, setGamesData] = useState(null);
    const [teamsData, setTeamsData] = useState(null);


    console.log(gamesData)
    console.log(teamsData)

    useEffect(() => {
        GamesGetAll((data) => {
            // Initialize editedData with the same data
            // setEditedData(data);
            setGamesData(data);
        });

        TeamsGetAll((data) => {
            setTeamsData(data);
        });

    }, []);

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} pb={'30dvh'}>

                <TableContainer>
                    <Table size='sm' >

                        <>
                            <Tbody>
                                {/* View tournament plan */}
                                {gamesData && gamesData.length < 8 &&
                                    gamesData.map((game, gameIndex) => (
                                        <Tr key={game.id} id={game.id}>
                                            <Td><Text>team 1 members</Text></Td>
                                            <Td><Text>{game.team_name_1}</Text></Td>
                                            <Td><Text>{game.team_score_1} </Text></Td>
                                            <Td><Text>{game.team_score_2} </Text></Td>
                                            <Td><Text>{game.team_name_2}</Text></Td>
                                            <Td><Text>team 2 members</Text></Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </>


                        {isAdminLoggedinStored && (
                            <>
                                <Tr>
                                    <Td><Text>team 1 members</Text></Td>
                                    <Td>
                                        <Select placeholder='Choose a team'>
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.team_id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </Td>
                                    <Td maxInlineSize={'80px'}>
                                        <Input textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input>
                                    </Td>
                                    <Td><Text textAlign={'center'}>–</Text></Td>
                                    <Td maxInlineSize={'80px'}>
                                        <Input fontSize={'xl'} defaultValue={null}></Input>
                                    </Td>
                                    <Td>
                                        <Select placeholder='Choose an opponent'>
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.team_id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </Td>
                                    <Td><Text>team 1 members</Text></Td>

                                </Tr>
                            </>
                        )}
                        


                    </Table>
                </TableContainer>

            </Box>
        </>
    )
};



