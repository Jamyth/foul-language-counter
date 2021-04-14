import React from 'react';
import { Button, Flex, Box, Heading, ButtonGroup, Text, Input, useColorMode } from '@chakra-ui/react';
import { useMainStateAction, useMainState } from '../index';
import { ImVolumeMute2, ImVolumeMedium } from 'react-icons/im';
import { FiSun, FiMoon } from 'react-icons/fi';

export const Main = React.memo(() => {
    const isMuted = useMainState((state) => state.muted);
    const accumulated = useMainState((state) => state.accumulated);
    const amount = useMainState((state) => state.amount);
    const delta = useMainState((state) => state.delta);
    const { toggleMute, clearAmount, updateDelta, add } = useMainStateAction();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex flex={1} direction="column" minH="100vh" justifyContent="space-between">
            <Flex alignItems="center" justifyContent="center" p={10} pt={16}>
                <Heading size="lg">粗口免問</Heading>
            </Flex>

            <Flex flexDirection="column" px={24}>
                <Box>累計罰款： HKD ${accumulated}</Box>
                <Box>新罰款： HKD ${amount}</Box>
                <Flex alignItems="center" justifyContent="center" w="100%" mt={8}>
                    <Button onClick={add} colorScheme="teal" width="35vw" height="35vw">
                        一野罰落去！
                    </Button>
                </Flex>
                <Flex mt={8} flexDirection="column">
                    <Text>調整罰金</Text>
                    <ButtonGroup isAttached mt={2}>
                        <Button colorScheme="teal" onClick={() => updateDelta(delta - 5)}>
                            -
                        </Button>
                        <Input colorScheme="teal" borderRadius={0} value={delta} type="number" />
                        <Button colorScheme="teal" onClick={() => updateDelta(delta + 5)}>
                            +
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex>

            <Flex alignItems="center" p={8}>
                <ButtonGroup>
                    <Button colorScheme="teal" onClick={toggleMute}>
                        {isMuted ? <ImVolumeMute2 /> : <ImVolumeMedium />}
                    </Button>
                    <Button colorScheme="teal" onClick={clearAmount}>
                        找數
                    </Button>
                    <Button colorScheme="teal" onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FiSun /> : <FiMoon />}
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    );
});
