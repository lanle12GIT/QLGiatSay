// src/screens/ReadyScreen.tsx
import React from 'react';
import { Box, Text, Button } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'Ready'>;

export default function ReadyScreen({ navigation }: Props) {
  return (
    <Box flex={1} p={4} bg="white">
      <Text fontSize="lg" bold mb={4}>Đơn đã sẵn sàng</Text>
      {/* TODO: render FlatList đơn */}
      <Button onPress={() => navigation.navigate('Dashboard')}>In Bill & Delivered</Button>
    </Box>
  );
}
