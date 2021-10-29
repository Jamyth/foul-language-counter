import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import type { FoulHistory } from 'util/FoulHistoryUtil';
import { DateUtil } from 'util/DateUtil';

interface Props {
    history: FoulHistory;
}

export const Dialog = React.memo(({ history }: Props) => {
    const date = DateUtil.formatTime(history.date);
    const backgroundColor = useColorModeValue('teal.500', 'teal.200');
    const rawBackgroundColor = useColorModeValue('#319795', '#81E6D9');
    const color = useColorModeValue('white', 'gray.800');
    const grayColor = useColorModeValue('gray.100', 'gray.600');
    return (
        <Box my="3">
            <Box
                backgroundColor={backgroundColor}
                color={color}
                d="inline-block"
                pl="3"
                pr="2"
                py="1"
                borderRadius="0.5rem"
                borderTopLeftRadius="0"
                css={{
                    position: 'relative',
                    '&::before': {
                        position: 'absolute',
                        display: 'block',
                        content: '""',
                        width: 0,
                        height: 0,
                        borderTop: `8px solid ${rawBackgroundColor}`,
                        borderLeft: '8px solid transparent',
                        top: 0,
                        right: '100%',
                    },
                }}
            >
                <Box as="span" lineHeight="2" float="left">
                    {history.text} -{' '}
                    <Text as="span" color="teal.900" fontWeight="bold">
                        ${history.penalty}
                    </Text>
                </Box>
                <Box
                    float="right"
                    marginTop={history.text.length > 20 ? 0 : '1rem'}
                    as="span"
                    color={grayColor}
                    fontSize="12px"
                    ml="0.7rem"
                    alignSelf="flex-end"
                >
                    {date}
                </Box>
            </Box>
        </Box>
    );
});
