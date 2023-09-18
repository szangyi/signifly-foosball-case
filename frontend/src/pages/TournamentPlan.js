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
import GameCreateAPI from '../features/GameCreate';


export default function TournamentPlan() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [gamesData, setGamesData] = useState(null);
    const [teamsData, setTeamsData] = useState(null);
    const [team1Value, setTeam1Value] = useState(false);
    const [team2Value, setTeam2Value] = useState(false);


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


    const handleTeam1Change = (event) => {
        const valueData = event.target.value;
        console.log(valueData)
        setTeam1Value(valueData)
        console.log(team1Value)
    }

    const handleTeam2Change = (event) => {
        const valueData = event.target.value;
        setTeam2Value(valueData)
        console.log(team2Value)
    }


    const submitCreateHandler = () => {
        console.log('whatever')
        GameCreateAPI( {team_id_1: team1Value, team_id_2: team2Value, } )  
        
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
                                        <Text fontSize={'xl'} fontWeight={'700'} textAlign={'end'}>{game.team_score_1} </Text>
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
                                        <Select
                                            size='sm'
                                            placeholder='Choose a team'
                                            onChange={handleTeam1Change}
                                            value={team1Value}
                                        >
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </GridItem>
                                    <GridItem display={'flex'} justifyContent={'end'}>
                                        {/* <Input size='sm' maxW={'60px'} textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input> */}
                                        {/* <Text fontSize={'xl'} fontWeight={'700'} textAlign={'end'}>-</Text> */}
                                    </GridItem>
                                    <GridItem>
                                        <Text textAlign={'center'}>–</Text>
                                    </GridItem>
                                    <GridItem>
                                        {/* <Input size='sm' maxW={'60px'} textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input> */}
                                        {/* <Text fontSize={'xl'} fontWeight={'700'} > - </Text> */}
                                    </GridItem >
                                    <GridItem>
                                        <Select
                                            size='sm'
                                            placeholder='Choose a team'
                                            onChange={handleTeam2Change}
                                            value={team2Value}
                                        >
                                            {teamsData &&
                                                teamsData.map((team, teamIndex) => (
                                                    <option value={team.id}>{team.team_name}</option>
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



