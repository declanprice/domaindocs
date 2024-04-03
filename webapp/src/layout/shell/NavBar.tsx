import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
} from '@chakra-ui/react'

import { useLayoutStore } from '@stores/layout.store.ts'

export const NavBar = () => {
    const { isNavBarOpen, closeNavBar } = useLayoutStore();

    return <Drawer
        isOpen={isNavBarOpen}
        placement='left'
        onClose={closeNavBar}
    >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
                <Input placeholder='Type here...' />
            </DrawerBody>

            <DrawerFooter>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}