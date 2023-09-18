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
    Text,
    Select,
    Stack,
} from '@chakra-ui/react';

import { AddIcon, EditIcon } from '@chakra-ui/icons';

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

    const submitCreateHandler = () => {
        console.log('whatever')
        // const teamName = teamNameRef.current.value;
        // const teamMember1 = teamMember1Ref.current.value;
        // const teamMember2 = teamMember2Ref.current.value;

        // TeamCreateAPI({ team_name: teamName, team_member_1: teamMember1, team_member_2: teamMember2 });
        // window.location.reload()
    };

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} pb={'30dvh'}>

                <Stack>
                    <Box size='sm' >

                        <>
                            <Flex direction={'column'}>
                                {/* View tournament plan */}
                                {gamesData && gamesData.length < 8 &&
                                    gamesData.map((game, gameIndex) => (

                                        <Flex direction={'row'} w={'100%'} justifyContent={'space-around'} key={game.id} id={game.id}>

                                            <Box><Text>team 1 members</Text></Box>
                                            <Box><Text>{game.team_name_1}</Text></Box>
                                            <Box><Text>{game.team_score_1} </Text></Box>
                                            <Box><Text>–</Text></Box>
                                            <Box><Text>{game.team_score_2} </Text></Box>
                                            <Box><Text>{game.team_name_2}</Text></Box>
                                            <Box><Text>team 2 members</Text></Box>

                                        </Flex>


                                    ))}

                                {gamesData && isAdminLoggedinStored && (
                                    <>
                                        <form>
                                            <Flex direction={'row'} w={'100%'} justifyContent={'space-around'}>

                                                <Box>
                                                    <Select placeholder='Choose a team'>
                                                        {teamsData &&
                                                            teamsData.map((team, teamIndex) => (
                                                                <option value={team.team_id}>{team.team_name}</option>
                                                            ))}
                                                    </Select>
                                                </Box>
                                                <Box><Input textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input></Box>
                                                <Box><Text>–</Text></Box>
                                                <Box><Input textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input></Box>

                                                <Box>
                                                    <Select placeholder='Choose a team'>
                                                        {teamsData &&
                                                            teamsData.map((team, teamIndex) => (
                                                                <option value={team.team_id}>{team.team_name}</option>
                                                            ))}
                                                    </Select>
                                                </Box>

                                                <Button
                                                    onClick={submitCreateHandler}
                                                    backgroundColor={'#FEC7D4'}
                                                    rightIcon={<AddIcon />}
                                                    variant='solid'
                                                    mt={2}
                                                >
                                                    Add game
                                                </Button>

                                            </Flex>

                                        </form>
                                    </>
                                )}

                            </Flex>
                        </>






                    </Box>
                </Stack>

            </Box>
        </>
    )
};



