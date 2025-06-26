// src/screens/ReceivedScreen.tsx
import React from 'react';
import { Box, Text } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'Received'>;

export default function ReceivedScreen({ navigation }: Props) {
  return (
    <Box flex={1} p={4} bg="white" justifyContent="center" alignItems="center">
      <Text fontSize="2xl" bold>Đơn đang chờ</Text>
    </Box>
  );
}
