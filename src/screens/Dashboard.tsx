// src/screens/Dashboard.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { Box, Text, HStack, Fab, Icon, VStack, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

interface OrderItem { id: string; code: string; phone: string; weight: number; }

const mockData: OrderItem[] = [
  { id: '1', code: 'GS-250624-001', phone: '0912345678', weight: 3.5 },
  { id: '2', code: 'GS-250624-002', phone: '0987654321', weight: 2.0 },
];

export default function Dashboard({ navigation }: Props) {
  return (
    <Box flex={1} bg="white" safeArea p={4}>
      <Text fontSize="2xl" bold mb={4}>Bảng điều khiển</Text>

      <HStack space={2} mb={5}>
        <Pressable flex={1} onPress={() => navigation.navigate('Received')}>
          <Box bg="gray.100" p={2} rounded="lg">
            <Text fontSize="md">Đơn chờ</Text>
            <Text fontSize="2xl" bold mt={2}>{mockData.length}</Text>
          </Box>
        </Pressable>
        <Pressable flex={1} onPress={() => navigation.navigate('Ready')}>
          <Box bg="gray.100" p={2} rounded="lg">
            <Text fontSize="md">Đơn sẵn sàng</Text>
            <Text fontSize="2xl" bold mt={2}>{5}</Text>
          </Box>
        </Pressable>
        <Pressable flex={1} onPress={() => {navigation.navigate('Revenue')}}>
          <Box bg="gray.100" p={2} rounded="lg">
            <Text fontSize="md">Doanh thu</Text>
            <Text fontSize="md" bold mt={2}>1.200.000</Text>
          </Box>
        </Pressable>
      </HStack>

      <Text fontSize="lg" bold mb={2}>Đơn gần đây</Text>
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Received')}
            bg="gray.50" p={3} mb={2} rounded="md"
          >
            <HStack justifyContent="space-between">
              <VStack>
                <Text bold>{item.code}</Text>
                <Text color="gray.600">{item.phone}</Text>
              </VStack>
              <Text color="gray.600">{item.weight.toFixed(1)} kg</Text>
            </HStack>
          </Pressable>
        )}
      />

      <Fab
        renderInPortal={false}
        shadow={2}
        icon={<Icon as={MaterialIcons} name="add" color="white" size="sm" />}
        onPress={() => navigation.navigate('NewOrder')}
      />
    </Box>
  );
}
