// src/screens/SettingsScreen.tsx
import React from 'react';
import { Box, Text, Switch, VStack } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  return (
    <Box flex={1} p={4} bg="white">
      <Text fontSize="2xl" bold mb={4}>Cài đặt</Text>
      <VStack space={4}>
        <Box>
          <Text>Bật Loyalty</Text>
          <Switch />
        </Box>
        <Box>
          <Text>Yêu cầu vật tư</Text>
          <Switch />
        </Box>
        <Box>
          <Text>Đồng bộ đám mây (Tương lai)</Text>
          <Switch isDisabled />
        </Box>
      </VStack>
    </Box>
  );
}
