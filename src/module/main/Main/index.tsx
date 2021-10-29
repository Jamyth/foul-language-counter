import React from 'react';
import { Button, Flex, Box, Heading, ButtonGroup, Text, Input, useColorMode } from '@chakra-ui/react';
import { useMainStateAction, useMainState } from '../index';
import { ImVolumeMute2, ImVolumeMedium } from 'react-icons/im';
import { FiSun, FiMoon } from 'react-icons/fi';
import { HistoryModal } from './HistoryModal';

const VERSION_NUMBER = 'v1.1';

export const Main = React.memo(() => {
    const isMuted = useMainState((state) => state.muted);
    const accumulated = useMainState((state) => state.accumulated);
    const text = useMainState((state) => state.text);
    const amount = useMainState((state) => state.amount);
    const delta = useMainState((state) => state.delta);
    const { toggleMute, clearAmount, updateDelta, add, deduct, updateText } = useMainStateAction();
    const { colorMode, toggleColorMode } = useColorMode();
    const [active, setActive] = React.useState(false);

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
        <Flex flex={1} h="100%" direction="column" justifyContent="space-between">
            <Flex alignItems="center" justifyContent="center" flexDirection="column" p={8}>
                <Heading size="lg">粗口禁</Heading>

                <Flex fontSize="14px">{VERSION_NUMBER}</Flex>
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
                    <Text mt={4}>原因</Text>
                    <Input colorScheme="teal" value={text} onChange={(e) => updateText(e.target.value)} />
                </Flex>
            </Flex>

            <Flex alignItems="center" py={8} px={4}>
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
                    <Button colorScheme="teal" onClick={() => setActive(true)}>
                        紀錄
                    </Button>
                    <Button colorScheme="teal" onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FiSun /> : <FiMoon />}
                    </Button>
                </ButtonGroup>
            </Flex>
            <HistoryModal active={active} setActive={setActive} />
        </Flex>
    );
});
