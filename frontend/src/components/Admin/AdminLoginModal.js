
import React, { useContext, useEffect, useState } from "react"
import { UnlockIcon, LockIcon } from '@chakra-ui/icons'

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    IconButton,
    HStack,
    PinInput,
    PinInputField,
    Box,
    Flex
} from "@chakra-ui/react"



export default function AdminModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [adminLoginValue, setAdminLoginValue] = useState()

    const isAdminLoggedinStored = localStorage.getItem('isAdminLoggedinStored');
    // console.log(`local storage admin: ` + isAdminLoggedinStored)

    // Log in 
    useEffect(() => {
        if (adminLoginValue === '1234') {
            localStorage.setItem('isAdminLoggedinStored', 'true');
            onClose()
            window.location.reload()
        }
    }, [adminLoginValue])

    // Log out
    function adminLogout() {
        localStorage.removeItem('isAdminLoggedinStored');
        window.location.reload()
    }

    return (
        <>
            {isAdminLoggedinStored ? (
                <>
                    <Flex
                        direction={'column'}
                        position={'fixed'}
                        right={0}
                        bottom={0}
                        alignItems={'flex-end'}
                    >

                        <IconButton
                            borderColor={'#FEC7D4'}
                            w={'fit-content'}
                            variant='outline'
                            aria-label='Log out as admin'
                            icon={<UnlockIcon />}
                            onClick={adminLogout}
                        />
                    </Flex>
                </>
            ) : (
                <Flex
                    direction={'column'}
                    position={'fixed'}
                    right={0}
                    bottom={0}>
                    <IconButton
                        aria-label='Open admin login modal'
                        icon={<LockIcon />}
                        onClick={onOpen}
                    />
                </Flex>

            )}


            <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Admin password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <HStack justifyContent={'center'}>
                            <PinInput type='alphanumeric' onChange={(e) => setAdminLoginValue(e)}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </ModalBody>

                    <ModalFooter textAlign={'center'}>
                        <Button colorScheme='pink' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}