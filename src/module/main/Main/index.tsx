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
    const { toggleMute, clearAmount, updateDelta, add, deduct } = useMainStateAction();
    const { colorMode, toggleColorMode } = useColorMode();

    const [temp, setTemp] = React.useState(`${delta}`);

    const addDelta = () => {
        updateDelta(delta + 5);
    };

    const deductDelta = () => {
        updateDelta(delta - 5);
    };

    const onInputBlur = () => {
        const _delta = parseInt(temp);
        if (isNaN(_delta) || _delta < 5) {
            setTemp(`${delta}`);
            return;
        }
        const extra = _delta % 5;
        if (extra >= 3) {
            const val = _delta + 5 - extra;
            updateDelta(val);
            setTemp(String(val));
        } else {
            const val = _delta - extra;
            updateDelta(val);
            setTemp(String(val));
        }
    };

    React.useEffect(() => {
        setTemp(String(delta));
    }, [delta]);

    return (
        <Flex
            flex={1}
            direction="column"
            overflow="hidden"
            minH="-webkit-fill-available"
            justifyContent="space-between"
        >
            <Flex alignItems="center" justifyContent="center" p={8}>
                <Heading size="lg">粗口禁</Heading>
            </Flex>

            <Flex flexDirection="column" alignItems="center" justifyContent="center" px={24}>
                <Box>
                    <Box>累計罰款： HKD ${accumulated}</Box>
                    <Box>新罰款： HKD ${amount}</Box>
                </Box>
                <Button mt={8} onClick={add} colorScheme="teal" width="40vw" height="40vw">
                    一野罰落去！
                </Button>
                <Flex mt={8} flexDirection="column">
                    <Text>調整罰金</Text>
                    <ButtonGroup isAttached mt={2}>
                        <Button onClick={deductDelta} colorScheme="teal">
                            -
                        </Button>
                        <Input
                            colorScheme="teal"
                            onChange={(e) => setTemp(e.target.value)}
                            onBlur={onInputBlur}
                            borderRadius={0}
                            value={temp}
                        />
                        <Button onClick={addDelta} colorScheme="teal">
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
                    <Button colorScheme="teal" onClick={deduct}>
                        扣數
                    </Button>
                    <Button colorScheme="teal" onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FiSun /> : <FiMoon />}
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    );
});
