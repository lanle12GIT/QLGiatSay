import React from 'react';
import { Box, Text, Switch, VStack, View } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'Revenue'>;
const Revenue = () => {
    return (
        <View>
            <Text fontSize="2xl" bold mb={4}>Doanh thu</Text>
        </View>
    );
}
export default Revenue;