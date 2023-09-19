import React, { useEffect, useState, useRef } from 'react';


import {
    Card,
    Grid,
    GridItem,
    Box,
    Stack,
    Text,
    Flex,
    Link
} from "@chakra-ui/react"
import GamesGetAll from '../features/GamesGetAll';
import TeamsGetAll from '../features/TeamsGetAll';
import Rank1 from '../components/Images/Rank1';
import Rank2 from '../components/Images/Rank2';
import Rank3 from '../components/Images/Rank3';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Cucumber from '../components/Images/Cucumber';

export default function Home() {

    const initialIsAdminLoggedin = localStorage.getItem('isAdminLoggedinStored');
    console.log(`local storage admin: ` + initialIsAdminLoggedin)

    const [gamesData, setGamesData] = useState();
    const [teamsData, setTeamsData] = useState();

    function sortByKey(array, key) {
        return array.sort((a, b) => {
            const x = a[key];
            const y = b[key];
            return x > y ? -1 : x < y ? 1 : 0;
        });
    }

    useEffect(() => {
        GamesGetAll((data) => {
            setGamesData(data);
        });

        // TeamsGetAll((data) => {
        //     setTeamsData(data);
        // });

        TeamsGetAll((data) => {
            const sortedData = sortByKey(data, 'games_points')
            setTeamsData(sortedData);
        });

    }, []);


    console.log({ gamesData })
    console.log({ teamsData })

    return (
        <>

            <Stack mx={{ base: 5, md: 12 }} >

                <Grid
                    // h={'80dvh'}
                    h={'fit-content'}
                    mt={5}
                    gridTemplateColumns={{
                        // base: "1fr 1fr",
                        md: "3fr .5fr 2fr"
                    }}
                    gridTemplateRows={{
                        // base: "auto",
                        md: "2fr .5fr .3fr .4fr 3fr"
                    }}
                    gridTemplateAreas={{
                        // base: `'header header' 'leftcard rightcard' 'map map' 'leftscrollcard rightscrollcard' 'footer footer'`,
                        // md: `'header header header' 'leftcard map rightcard' 'leftscrollcard map rightscrollcard' 'footer footer footer'`
                        md: `'title gap leaderboard' 'tournamentplan gap2 leaderboard' 'tournamentplan gap2 leaderboard' 'tournamentplan gap2 teams' 'tournamentplan gap2 teams'`
                    }}
                // gap={4}
                >

                    {/* --- Headline --- */}
                    <Flex gridArea="title" direction={{ md: 'row' }} _bg="gray.500" pb={10} justifyContent={'space-between'}>
                        <Text fontSize={'xs'} mt={3}>
                            Scoreboard
                        </Text>
                        <Box>
                            <Text fontSize={'6xl'} maxW={'500px'}>
                                Table Foosball
                            </Text>
                            <Text fontSize={'6xl'} maxW={'500px'}>
                                Tournament
                            </Text>
                        </Box>
                    </Flex>
                    <Box gridArea="gap" _bg="pink">
                    </Box>


                    {/* --- Leaderboard --- */}
                    <Box gridArea="leaderboard" bg="black" mt={6}>

                        <Link href='/leaderboard' className='direct-link' display={'flex'} w={'fit-content'} color={'white'} ml={5} mt={5} mb={-3}>
                            <Text fontSize={'xs'} >Leaderboard</Text>
                            <ArrowForwardIcon />
                        </Link>

                        {teamsData && (
                            <Grid
                                gridTemplateColumns={'.8fr 1fr .6fr'}
                                gap={0}
                                px={10}
                            >
                                <Flex direction={'column'} alignItems={'center'} textAlign={'center'} mt={'40%'}>
                                    <Box ml={'auto'}>
                                        <Rank2 size={'100px'} />
                                        <Text fontSize={'xl'} color={'white'}>{teamsData[1].team_name}</Text>
                                        {/* <Text fontSize={'xl'} color={'white'}>place 2</Text> */}
                                    </Box>
                                </Flex>
                                <Flex direction={'column'} alignItems={'center'} textAlign={'center'} ml={'-10%'}>
                                    <Rank1 size={'130px'} />
                                    <Text fontSize={'xl'} color={'white'}>{teamsData[0].team_name}</Text>
                                    {/* <Text fontSize={'xl'} color={'white'}>place 1</Text> */}
                                </Flex>
                                <Flex direction={'column'} alignItems={'center'} textAlign={'center'} mt={'100%'} ml={'-40%'}>
                                    <Rank3 size={'60px'} />
                                    <Text fontSize={'xl'} color={'white'}>{teamsData[2].team_name}</Text>
                                    {/* <Text fontSize={'xl'} color={'white'}>place 3</Text> */}
                                </Flex>
                            </Grid>

                        )}

                    </Box>

                    {/* --- Tournament plan --- */}
                    <Box gridArea="tournamentplan" _bg="red.500" borderTop={'1.5px solid black'} pt={10}>
                        <Link href='/tournament-plan' className='direct-link' display={'flex'} w={'fit-content'}>
                            <Text fontSize={'xs'} >Tournament plan</Text>
                            <ArrowForwardIcon />
                        </Link>

                        <Stack w={'90%'} mt={10}>
                            {gamesData &&
                                gamesData.map((game, gameIndex) => (
                                    <Grid
                                        key={gameIndex}
                                        gridTemplateColumns={{
                                            base: '1fr .5fr .2fr .5fr 1fr'
                                        }}
                                        gridTemplateRows={{
                                            base: '1fr'
                                        }}
                                        mb={2}>

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
                                        <GridItem ml={'auto'}>
                                            <Text>{game.team_name_2}</Text>
                                        </GridItem>
                                    </Grid>

                                ))
                            }

                            <Grid
                                gridTemplateColumns={{
                                    base: '1fr .5fr .2fr .5fr 1fr'
                                }}
                                gridTemplateRows={{
                                    base: '1fr'
                                }}
                                mb={2}>

                                <GridItem>
                                </GridItem>
                                <GridItem>
                                </GridItem>
                                <GridItem>
                                    <Text fontSize={'xl'} fontWeight={'700'} textAlign={'center'}>...</Text>
                                </GridItem>
                                <GridItem>
                                </GridItem>
                                <GridItem>
                                </GridItem>
                            </Grid>

                        </Stack>


                    </Box>

                    {/* --- Teams --- */}
                    <Box gridArea="teams" _bg="blue.500">
                        <Link href='/teams' className='direct-link' display={'flex'} w={'fit-content'} mt={10}>
                            <Text fontSize={'xs'} >Teams</Text>
                            <ArrowForwardIcon />
                        </Link>

                        <Grid
                            templateColumns={{
                                base: '1fr',
                                md: 'repeat(2, 1fr)',
                                // lg: 'repeat(4, 1fr)',
                            }}
                            templateRows={{
                                base: '8fr',
                                md: 'repeat(4, 1fr)',
                                // lg: 'repeat(2, 1fr)',
                            }}
                            rowGap={4}
                            columnGap={10}
                            mt={6}>

                            {teamsData &&
                                teamsData.map((team, teamIndex) => (
                                    <GridItem key={team.id} w='100%' h='100%'>
                                        <Card h={'100%'} borderRadius={0} boxShadow={0}>
                                            <Grid
                                                gridTemplateColumns={'2fr 2fr'}
                                                columnGap={2}
                                            >
                                                <GridItem>
                                                    <Text fontSize={'lg'} >
                                                        {team.team_name}
                                                    </Text>
                                                </GridItem>
                                                <GridItem ml={'auto'} mt={2}>
                                                    <Flex direction={'column'} >
                                                        <Text fontSize={'sm'} >
                                                            {team.team_member_1}
                                                        </Text>
                                                        <Text fontSize={'sm'} >
                                                            {team.team_member_2}
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                            </Grid>
                                        </Card>
                                    </GridItem>
                                ))}
                        </Grid>


                    </Box>
                </Grid >

                <Box position={'absolute'} bottom={10} left={0}>
                    <Cucumber />
                </Box>

            </Stack >

        </>
    )
};



