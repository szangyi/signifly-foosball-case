"use client"

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import TeamsGetAll from '../features/TeamsGetAll.js';
import TeamUpdateAPI from '../features/TeamUpdate.js';


import {
    Box,
    Card,
    Text,
    Grid,
    GridItem,
    Editable,
    EditablePreview,
    EditableInput,
    Flex,
    Button
} from "@chakra-ui/react"
import { EditIcon } from '@chakra-ui/icons'



export default function Teams() {

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [teamsData, setTeamsData] = useState(null);

    useEffect(() => {
        TeamsGetAll(setTeamsData);
    }, [])


    if (teamsData) {
        // console.log(teamsData[0][1])
    }

    // console.log(teamsData[0][1])
    // const values = {
    //    team_name
    // };


    // API calls
    // const submitHandler = async ({event, data}) => {
    //     console.log('submithandler')
    //     // event.preventDefault();
    //     // TeamUpdateAPI()
    // }

    const submitHandler = data => console.log(data);


    return (
        <>

            <Box mx={{ base: 5, md: 12 }}>

                <Text fontSize={'6xl'} mt={10} >
                    Teams
                </Text>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    templateRows={{ base: '8fr', md: 'repeat(4, 1fr)', lg: 'repeat(2, 1fr)' }}
                    gap={20}
                    mt={20}
                >

                    {teamsData && (
                        teamsData.map((profile) => (
                            <GridItem key={profile[0]} id={profile[0]} w='100%' h='100%'>
                                <Card h={'100%'} borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>

                                    {isAdminLoggedinStored ? (
                                        <>
                                            <form id="team-edit-form">
                                                <Editable defaultValue={profile[1]} fontSize={'3xl'} mt={5}>
                                                    <EditablePreview w={'full'} />
                                                    <EditableInput/>
                                                </Editable>
                                                <Editable defaultValue={profile[2]} fontSize={'md'} mt={5}>
                                                    <EditablePreview w={'full'} />
                                                    <EditableInput />
                                                </Editable>
                                                <Editable defaultValue={profile[3]} fontSize={'md'} mt={5}>
                                                    <EditablePreview w={'full'} />
                                                    <EditableInput />
                                                </Editable>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <Text fontSize={'3xl'} mt={5}>{profile[1]}</Text>
                                            <Text fontSize={'md'} mt={5}>{profile[2]}</Text>
                                            <Text fontSize={'md'} mt={5}>{profile[3]}</Text>
                                        </>
                                    )
                                    }

                                </Card>
                            </GridItem>
                        ))
                    )
                    }


                </Grid>

            </Box>

            {isAdminLoggedinStored && (
                <Flex
                    direction={'column'}
                    position={'fixed'}
                    right={0}
                    bottom={10}
                    alignItems={'flex-end'}
                >
                    <Button
                        form='team-edit-form'
                        type='submit'
                        backgroundColor={'#FEC7D4'}
                        rightIcon={<EditIcon />}
                        variant='solid'
                        onClick={submitHandler}
                    >
                        Save changes
                    </Button>
                </Flex>
            )}

        </>
    )
};



