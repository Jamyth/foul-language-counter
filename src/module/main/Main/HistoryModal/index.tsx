import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';
import { FoulHistory, FoulHistoryUtil } from 'util/FoulHistoryUtil';
import { Dialog } from './Dialog';

interface Props {
    active: boolean;
    setActive: (value: boolean) => void;
}

export const HistoryModal = React.memo(({ active, setActive }: Props) => {
    const backgroundColor = useColorModeValue('gray.200', 'gray.600');
    const dateTagBackgroundColor = useColorModeValue('white', 'gray.700');
    const list = FoulHistoryUtil.get();
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    const groupByDate = (list: FoulHistory[]): { date: string; history: FoulHistory[] }[] => {
        const groups = list.reduce<{ [date: string]: FoulHistory[] }>((acc, curr) => {
            const date = curr.date.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(curr);
            return acc;
        }, {});

        return Object.keys(groups).map((_) => ({
            date: _,
            history: groups[_],
        }));
    };

    const formattedList = React.useMemo(() => groupByDate(list), [list]);

    React.useEffect(() => {
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }, [container]);

    return (
        <Modal isOpen={active} onClose={() => setActive(false)} size="xs" isCentered>
            <ModalOverlay css={{ backdropFilter: 'blur(3px)' }} />
            <ModalContent>
                <ModalHeader shadow="md" textAlign="center">
                    懲罰紀錄
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    ref={setContainer}
                    minH="40vh"
                    maxH="40vh"
                    overflowY="auto"
                    backgroundColor={backgroundColor}
                >
                    {formattedList.map((_, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Flex
                                    justifyContent="center"
                                    alignItems="center"
                                    py={2}
                                    position="sticky"
                                    top="0"
                                    zIndex="100"
                                >
                                    <Flex
                                        backgroundColor={dateTagBackgroundColor}
                                        borderRadius="5rem"
                                        fontSize="14px"
                                        shadow="md"
                                        px={3}
                                    >
                                        {_.date}
                                    </Flex>
                                </Flex>
                                {_.history.map((_, j) => (
                                    <Dialog history={_} key={j} />
                                ))}
                            </React.Fragment>
                        );
                    })}
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button fontWeight="medium" colorScheme="teal" mr={3} onClick={() => setActive(false)}>
                        關閉
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
