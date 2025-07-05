import React from 'react';
import { Box, Text, Switch, VStack, View, HStack } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';
import { Pressable } from 'react-native';

type Props = BottomTabScreenProps<RootTabParamList, 'Revenue'>;
const Revenue = () => {
    return (
        <View flex={1} bg="white" px={4} py={2}>
            <Text fontSize="2xl" bold mb={4}>Doanh thu</Text>

            <HStack  flex={1}space={2} mb={5} mt={5} style={{ height: '20%' }}>

                <Pressable flex={1} onPress={() => navigation.navigate('Received')}>
                    <Box flex={1} bg="blue.200" p={2} rounded="md" borderColor={"gray.400"} borderWidth={1}>
                        <Text fontSize="md">Ngày hôm nay</Text>
                        <Text fontSize="xl" bold mt={2}> 2.000.000</Text>
                    </Box>
                </Pressable>

                <Pressable flex={1} onPress={() => navigation.navigate('Ready')}>
                    <Box flex={1} bg="blue.200" p={2} rounded="md" borderColor={"gray.400"} borderWidth={1}>
                        <Text fontSize="md">Tuần này</Text>
                        <Text fontSize="xl" bold mt={2} > 10.000.000</Text>
                    </Box>
                </Pressable>

                <Pressable flex={1} onPress={() => { navigation.navigate('Revenue') }}>
                    <Box flex={1} bg="blue.200" p={2} rounded="md" borderColor={"gray.400"} borderWidth={1}>
                        <Text fontSize="md">Tháng này</Text>
                        <Text fontSize="xl" bold mt={2}>60.000.000</Text>
                    </Box>
                </Pressable>

                

            </HStack>

        </View>
    );
}
export default Revenue;