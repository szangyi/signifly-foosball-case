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
                    <Grid
                        mt={10}
                        gridTemplateColumns={{
                            base: '.5fr 1fr 1fr .5fr .2fr .5fr 1fr 1fr .5fr'
                        }}
                        gridTemplateRows={{
                            base: '1fr'
                        }}>

                        {/* View tournament plan */}
                        {gamesData &&
                            gamesData.map((game, gameIndex) => (
                                <>
                                    <GridItem>
                                        <Text>gap</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>team 1 members</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>{game.team_name_1}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text  fontSize={'xl'} fontWeight={'700'} textAlign={'end'}>{game.team_score_1} </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize={'xl'} fontWeight={'700'} textAlign={'center'}>–</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize={'xl'} fontWeight={'700'} >{game.team_score_2} </Text>
                                    </GridItem >
                                    <GridItem>
                                        <Text>{game.team_name_2}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>team 2 members</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>button</Text>
                                    </GridItem>
                                </>
                            ))}

                    </Grid>

                    {/* Edit tournament plan */}
                    {gamesData && isAdminLoggedinStored && gamesData.length < 8 && (
                        <>
                            <form>

                                <Grid
                                    mt={10}
                                    gridTemplateColumns={{
                                        base: '.5fr 1fr 1fr .5fr .2fr .5fr 1fr 1fr .5fr'
                                    }}
                                    gridTemplateRows={{
                                        base: '1fr'
                                    }}>

                                    <GridItem>
                                        <Text>gap</Text>
                                    </GridItem>
                                    <GridItem>
                                        {/* <Text>team 1 members</Text> */}
                                    </GridItem>
                                    <GridItem>
                                        <Select size='sm' placeholder='Choose a team'>
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.team_id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </GridItem>
                                    <GridItem display={'flex'} justifyContent={'end'}>
                                        <Input size='sm' maxW={'60px'}  textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input>
                                    </GridItem>
                                    <GridItem>
                                        <Text textAlign={'center'}>–</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Input size='sm' maxW={'60px'} textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input>
                                    </GridItem >
                                    <GridItem>
                                        <Select size='sm' placeholder='Choose a team'>
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.team_id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </GridItem>
                                    <GridItem>
                                        {/* <Text>team 2 members</Text> */}
                                    </GridItem>
                                    <GridItem>
                                        <Button
                                            onClick={submitCreateHandler}
                                            backgroundColor={'#FEC7D4'}
                                            rightIcon={<AddIcon />}
                                            variant='solid'
                                            size={'xs'}
                                        >
                                            Add
                                        </Button>
                                    </GridItem>

                                </Grid >

                            </form>
                        </>
                    )}


                </Stack >
            </Box>
        </>
    )
};



