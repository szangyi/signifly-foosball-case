"use client"
import React, {useContext} from "react"
import Logo from "../Logo/Logo"

import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Popover,
    PopoverTrigger,
    useBreakpointValue,
    useDisclosure
} from "@chakra-ui/react"
import {
    HamburgerIcon,
    CloseIcon,
} from "@chakra-ui/icons"
import AuthContext from "../../util/auth-context"


export default function Nav() {

    const ctx = useContext(AuthContext)

    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
            <Box mx={{ base: 5, md: 12 }}
            >
                {ctx.isAdminLoggedin && (
                    <li>
                        <h1>YEAAAHH</h1>
                    </li>
                )}
                <Flex
                    bg={'white'}
                    color={"black"}
                    minH={"100px"}
                    py={{ base: 2 }}
                    borderBottom={'1.5px'}
                    borderStyle={"solid"}
                    borderColor={"black"}
                    align={"center"}
                >
                    <Flex
                        flex={{ base: 1, md: "auto" }}
                        ml={{ base: -2 }}
                        display={{ base: "flex", md: "none" }}
                    >
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            variant={"ghost"}
                            aria-label={"Toggle Navigation"}
                        />
                    </Flex>
                    <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                        {/* deal with this later */}
                        {/* <Logo textAlign={useBreakpointValue({ base: "center", md: "left" })}/> */}
                        <Logo textAlign={"center"} />

                        <Flex display={{ base: "none", md: "flex" }} ml={10} justify={'flex-end'} width={'100%'}>
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                    </Stack>
                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>

        </>

    )
}

const DesktopNav = () => {

    return (
        <Stack direction={"row"} spacing={30}>
            {NAV_ITEMS.map(navItem => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize={"xl"}
                                fontWeight={400}
                                color={'black'}
                            // color={linkColor}
                            >
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const MobileNav = () => {
    return (
        <Stack
            bg={"white"}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map(navItem => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? "#"}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: "none"
                }}
            >
                <Text
                    fontWeight={400}
                    color={"black"}
                >
                    {label}
                </Text>
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    align={"start"}
                >
                    {children &&
                        children.map(child => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

const NAV_ITEMS = [
    {
        label: "Tournament plan",
        href: "/tournament-plan"
    },
    {
        label: "Leaderboard",
        href: "/leaderboard"
    },
    {
        label: "Teams",
        href: "/teams"
    }
]
