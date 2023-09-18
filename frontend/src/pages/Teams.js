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
    Text,
    Card,
    Input,
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import TeamsGetAll from '../features/TeamsGetAll';
import TeamUpdateAPI from '../features/TeamUpdate';
import TeamCreateAPI from '../features/TeamCreate';

export default function Teams() {
    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [teamsData, setTeamsData] = useState(null);
    const [editedData, setEditedData] = useState([]);
    const teamNameRef = useRef(null);
    const teamMember1Ref = useRef(null);
    const teamMember2Ref = useRef(null);

    console.log(teamsData)

    useEffect(() => {
        TeamsGetAll((data) => {
            // Initialize editedData with the same data
            setEditedData(data);
            setTeamsData(data);
        });
    }, []);

    // const handleFieldChange = (event, teamIndex, fieldIndex) => {
    //     const newValue = event.target.value;
    //     setEditedData((prevData) =>
    //         prevData.map((team, i) =>
    //             i === teamIndex ? { ...team, [fieldIndex]: newValue } : team
    //         )
    //     );
    // };
    const handleFieldChange = (event, teamIndex, fieldIndex) => {
        const newValue = event.target.value;
        setEditedData((prevData) => {
            const updatedData = [...prevData];
            updatedData[teamIndex][fieldIndex] = newValue;
            return updatedData;
        });
    };
    
      
    const submitChangeHandler = () => {
        // Send editedData to your backend API here
        console.log('Edited Data:', editedData);
        TeamUpdateAPI(editedData)
    };

    // const submitCreateHandler = () => {
    //     const teamName = teamNameRef.current.value;
    //     const teamMember1 = teamMember1Ref.current.value;
    //     const teamMember2 = teamMember2Ref.current.value;

    //     TeamCreateAPI({ team_name: teamName, team_member_1: teamMember1, team_member_2: teamMember2 });
    //     window.location.reload()
    // };

    return (
        <>
            <Box mx={{ base: 5, md: 12 }} pb={'30dvh'}>
                <Text fontSize={'6xl'} mt={10}>
                    Teams
                </Text>
                <Grid
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                    templateRows={{
                        base: '8fr',
                        md: 'repeat(4, 1fr)',
                        lg: 'repeat(2, 1fr)',
                    }}
                    gap={20}
                    mt={20}>

                    {/* View & edit teams */}
                    {teamsData &&
                        teamsData.map((team, teamIndex) => (
                            <GridItem key={team.id} id={team.id} w='100%' h='100%'>
                                <Card h={'100%'} borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                                    {isAdminLoggedinStored ? (
                                        <form id={`team-edit-form-${teamIndex}`}>
                                            <Editable
                                                defaultValue={team.team_name}
                                                fontSize={'3xl'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 'team_name')
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                            <Editable
                                                defaultValue={team.team_member_1}
                                                fontSize={'md'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 'team_member_1')
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                            <Editable
                                                defaultValue={team.team_member_2}
                                                fontSize={'md'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 'team_member_2')
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                        </form>
                                    ) : (
                                        <>
                                            <Text fontSize={'3xl'} mt={5}>
                                                {team[1]}
                                            </Text>
                                            <Text fontSize={'md'} mt={5}>
                                                {team[2]}
                                            </Text>
                                            <Text fontSize={'md'} mt={5}>
                                                {team[3]}
                                            </Text>
                                        </>
                                    )}
                                </Card>
                            </GridItem>
                        ))}

                    {/* Add team */}
                    {/* {isAdminLoggedinStored && teamsData && teamsData.length < 8 && (
                        <GridItem w='100%' h='100%'>
                            <Card h={'100%'} borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                                <form id='team-create-form'>
                                    <Input placeholder='Teamname' fontSize={'3xl'} mt={5} ref={teamNameRef}
                                    />
                                    <Input placeholder='Team member 1' fontSize={'md'} mt={5} ref={teamMember1Ref}
                                    />
                                    <Input placeholder='Team member 2' fontSize={'md'} mt={5} ref={teamMember2Ref}
                                    />
                                    <Button
                                        onClick={submitCreateHandler}
                                        backgroundColor={'#FEC7D4'}
                                        rightIcon={<AddIcon />}
                                        variant='solid'
                                        mt={2}
                                    >
                                        Add team
                                    </Button>
                                </form>
                            </Card>
                        </GridItem>
                    )} */}

                </Grid>
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
    );
}
