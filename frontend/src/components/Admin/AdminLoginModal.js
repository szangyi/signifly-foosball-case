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
    IconButton
} from "@chakra-ui/react"
import AdminLock from "./AdminLock"


export default function AdminModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {/* <AdminLock onClick={onOpen}/> */}

            <IconButton
                aria-label='Change data as admin'
                icon={<UnlockIcon />}
                position={'fixed'}
                right={0}
                bottom={0}
                onClick={onOpen}
            />

            <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>Helloka</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}