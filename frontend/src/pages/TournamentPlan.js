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
    Show,
} from '@chakra-ui/react';

import { AddIcon, EditIcon } from '@chakra-ui/icons';

import GamesGetAll from '../features/GamesGetAll';
import TeamsGetAll from '../features/TeamsGetAll';
import GameCreateAPI from '../features/GameCreate';
import GamesUpdateAPI from '../features/GamesUpdate';


export default function TournamentPlan() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [gamesData, setGamesData] = useState();
    const [teamsData, setTeamsData] = useState();
    const [editedData, setEditedData] = useState([]);
    const [team1Value, setTeam1Value] = useState();
    const [team2Value, setTeam2Value] = useState();

    useEffect(() => {
        GamesGetAll((data) => {
            // Initialize editedData with the same data
            setEditedData(data);
            setGamesData(data);
        });

        TeamsGetAll((data) => {
            setTeamsData(data);
        });

    }, []);


    // Create a game
    const handleTeam1Change = (event) => {
        const valueData = event.target.value;
        // console.log(valueData)
        setTeam1Value(valueData)
    }

    const handleTeam2Change = (event) => {
        const valueData = event.target.value;
        setTeam2Value(valueData)
        // console.log(valueData)
    }


    // Update a game
    const handleFieldChange = (event, gameIndex, fieldName, gameId) => {
        const newValue = event.target.value;
        setEditedData((prevData) => {
            const updatedData = [...prevData];
            const updatedGame = { ...updatedData[gameIndex] }; // Get a copy of the game object at the specified index
            updatedGame[fieldName] = newValue; // Update the field in the game object
            updatedGame['game_id'] = gameId; // Include the game_id
            updatedData[gameIndex] = updatedGame; // Update the game object in the array
            console.log({ updatedData })
            return updatedData;
        });
    };


    const submitCreateHandler = () => {
        GameCreateAPI({ team_id_1: team1Value, team_id_2: team2Value, })
    };

    const submitChangeHandler = () => {
        // Send editedData to your backend API here
        console.log('Edited Data:', editedData);
        GamesUpdateAPI(editedData)
    };

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} pb={'30dvh'}>

                <Stack mt={10}>
                    {gamesData &&
                        gamesData.map((game, gameIndex) => (
                            isAdminLoggedinStored ? (
                                <form id={`game-edit-form-${gameIndex}`} key={gameIndex}>
                                    <Grid
                                        mb={6}
                                        gridTemplateColumns={{
                                            base: '1fr 1fr .5fr .2fr .5fr 1fr 1fr',
                                            md: '.5fr 1fr 1fr .5fr .2fr .5fr 1fr 1fr .5fr'
                                        }}
                                        gridTemplateRows={{
                                            base: '1fr'
                                        }}
                                        columnGap={2}
                                    >

                                        <Show breakpoint='(min-width: 700px)'>
                                            <GridItem>
                                            </GridItem>
                                        </Show>
                                        <GridItem>
                                            <Flex direction={'column'}>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_1_member_1}</Text>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_1_member_2}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Select
                                                id="team1updatechange"
                                                size='sm'
                                                placeholder='Choose a team'
                                                // onChange={handleTeam1UpdateChange}
                                                defaultValue={game.team_id_1}
                                                onChange={(event) =>
                                                    handleFieldChange(event, gameIndex, 'team_id_1', game.game_id)
                                                }

                                            // value={game.team_id_1}
                                            >
                                                {teamsData &&
                                                    teamsData.map((team, teamIndex) => (
                                                        <option key={teamIndex} value={team.id}>{team.team_name}</option>
                                                    ))}
                                            </Select>
                                        </GridItem>
                                        <GridItem>
                                            <Editable
                                                fontSize={'lg'}
                                                fontWeight={'700'}
                                                textAlign={'end'}
                                                defaultValue={game.team_score_1} 
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, gameIndex, 'team_score_1', game.game_id)
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize={'xl'} fontWeight={'700'} textAlign={'center'}>–</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Editable
                                                fontSize={'lg'}
                                                fontWeight={'700'}
                                                textAlign={'start'}
                                                defaultValue={game.team_score_2} 
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, gameIndex, 'team_score_2', game.game_id)
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                        </GridItem>
                                        <GridItem>
                                            <Select
                                                id="team2updatechange"
                                                size='sm'
                                                placeholder='Choose a team'
                                                onChange={(event) =>
                                                    handleFieldChange(event, gameIndex, 'team_id_2', game.game_id)
                                                }
                                                defaultValue={game.team_id_2}
                                            >
                                                {teamsData &&
                                                    teamsData.map((team, teamIndex) => (
                                                        <option key={teamIndex} value={team.id}>{team.team_name}</option>
                                                    ))}
                                            </Select>
                                        </GridItem>
                                        <GridItem>
                                            <Flex direction={'column'}>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_2_member_1}</Text>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_2_member_2}</Text>
                                            </Flex>
                                        </GridItem>
                                        <Show breakpoint='(min-width: 700px)'>
                                            <GridItem>
                                            </GridItem>
                                        </Show>
                                    </Grid>
                                </form>

                            ) :
                                (
                                    <Grid
                                        key={gameIndex}
                                        mt={10}
                                        gridTemplateColumns={{
                                            base: '1fr 1fr .5fr .2fr .5fr 1fr 1fr',
                                            md: '.5fr 1fr 1fr .5fr .2fr .5fr 1fr 1fr .5fr'
                                        }}
                                        gridTemplateRows={{
                                            base: '1fr'
                                        }}>

                                        <Show breakpoint='(min-width: 700px)'>
                                            <GridItem>
                                            </GridItem>
                                        </Show>
                                        <GridItem>
                                            <Flex direction={'column'}>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_1_member_1}</Text>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_1_member_2}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Text>{game.team_name_1}</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize={'xl'} fontWeight={'700'} textAlign={'end'}>{game.team_score_1}</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize={'xl'} fontWeight={'700'} textAlign={'center'}>–</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize={'xl'} fontWeight={'700'}>{game.team_score_2}</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text>{game.team_name_2}</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Flex direction={'column'}>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_2_member_1}</Text>
                                                <Text fontSize={'xs'} color={'#979BA3'}>{game.team_2_member_2}</Text>
                                            </Flex>
                                        </GridItem>
                                        <Show breakpoint='(min-width: 700px)'>
                                            <GridItem>
                                            </GridItem>
                                        </Show>
                                    </Grid>
                                )
                        ))
                    }


                    {/* Add more games plan */}
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
                                    }}
                                >

                                    <GridItem>
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
                                                    <option key={teamIndex} value={team.id}>{team.team_name}</option>
                                                ))}
                                        </Select>
                                    </GridItem>
                                    <GridItem display={'flex'} justifyContent={'end'}>
                                        {/* <Input size='sm' maxW={'60px'} textAlign={'end'} fontSize={'xl'} defaultValue={null}></Input> */}
                                        {/* <Text fontSize={'xl'} fontWeight={'700'} textAlign={'end'}>-</Text> */}
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize={'xl'} fontWeight={'700'} textAlign={'center'}>–</Text>
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
                                                    <option key={teamIndex} value={team.id}>{team.team_name}</option>
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
                    )
                    }


                </Stack >
            </Box >

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



