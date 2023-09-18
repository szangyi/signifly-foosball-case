import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import TeamsGetAll from '../features/TeamsGetAll';
import TeamUpdateAPI from '../features/TeamUpdate';

export default function Teams() {
    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    const [teamsData, setTeamsData] = useState(null);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        TeamsGetAll((data) => {
            // Initialize editedData with the same data
            setEditedData(data);
            setTeamsData(data);
        });
    }, []);

    const handleFieldChange = (event, teamIndex, fieldIndex) => {
        const newValue = event.target.value;
        setEditedData((prevData) =>
            prevData.map((team, i) =>
                i === teamIndex ? { ...team, [fieldIndex]: newValue } : team
            )
        );
    };

    const submitHandler = () => {
        // Send editedData to your backend API here
        console.log('Edited Data:', editedData);
        TeamUpdateAPI(editedData)
    };

    return (
        <>
            <Box mx={{ base: 5, md: 12 }}>
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
                    mt={20}
                >
                    {teamsData &&
                        teamsData.map((team, teamIndex) => (
                            <GridItem key={teamIndex} id={teamIndex} w='100%' h='100%'>
                                <Card h={'100%'} borderRadius={0} boxShadow={0} borderTop={'1.5px solid black'}>
                                    {isAdminLoggedinStored ? (
                                        <form id={`team-edit-form-${teamIndex}`}>
                                            <Editable
                                                defaultValue={team[1]}
                                                fontSize={'3xl'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 1)
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                            <Editable
                                                defaultValue={team[2]}
                                                fontSize={'md'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 2)
                                                }
                                            >
                                                <EditablePreview w={'full'} />
                                                <EditableInput />
                                            </Editable>
                                            <Editable
                                                defaultValue={team[3]}
                                                fontSize={'md'}
                                                mt={5}
                                                onChange={(newValue) =>
                                                    handleFieldChange({ target: { value: newValue } }, teamIndex, 3)
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
                </Grid>
            </Box>
            {isAdminLoggedinStored && (
                <Flex direction={'column'} position={'fixed'} right={0} bottom={10} alignItems={'flex-end'}>
                    <Button
                        onClick={submitHandler}
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
