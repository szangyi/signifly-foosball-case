
import React, { useContext } from "react"
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
    Text,
    useDisclosure,
    IconButton,
    HStack,
    PinInput,
    PinInputField
} from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import AuthContext from "../../util/auth-context";



export default function AdminModal({ setIsAdminLoggedin }) {

    const ctx = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [adminLoginValue, setAdminLoginValue] = useState()


    useEffect(() => {
        if (adminLoginValue === '1234') {
            setIsAdminLoggedin(true)
            console.log('login success')
            onClose()
        }
    }, [adminLoginValue])

    return (
        <>
            {/* <AdminLock onClick={onOpen}/> */}

            {ctx.isAdminLoggedin ? (
                <IconButton
                    aria-label='Change data as admin'
                    icon={<UnlockIcon />}
                    position={'fixed'}
                    right={0}
                    bottom={0}
                />
            ) : (
                <IconButton
                    aria-label='Change data as admin'
                    icon={<LockIcon />}
                    position={'fixed'}
                    right={0}
                    bottom={0}
                    onClick={onOpen}
                />
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