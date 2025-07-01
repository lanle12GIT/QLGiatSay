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
  { id: '3', code: 'GS-250624-003', phone: '0987609876', weight: 2.0 },
  { id: '4', code: 'GS-250624-004', phone: '0912345679', weight: 1.5 },
  { id: '5', code: 'GS-250624-005', phone: '0912345680', weight: 4.0 },
  { id: '6', code: 'GS-250624-006', phone: '0912345681', weight: 3.0 },
  { id: '7', code: 'GS-250624-007', phone: '0912345681', weight: 3.0 },
  { id: '8', code: 'GS-250624-008', phone: '0912345681', weight: 3.0 },

];

export default function Dashboard({ navigation }: Props) {
  return (
    <Box flex={1} p={4} bg="white" >
    
  <Text fontSize="3xl" bold mb={1}>GIẶT SẤY</Text>
      <HStack space={2} mb={5} mt={5} style={{height: '10%'}}>

        <Pressable flex={1} onPress={() => navigation.navigate('Received')}>
           <Box  flex={1} bg="pink.200" p={2} rounded="md"  borderColor={"gray.400"} borderWidth={1}>
            <Text fontSize="md">Đơn chờ</Text>
            <Text fontSize="2xl" bold mt={2}>{mockData.length}</Text>
          </Box>
        </Pressable>

        <Pressable flex={1} onPress={() => navigation.navigate('Ready')}>
          <Box  flex={1} bg="pink.200" p={2} rounded="md"  borderColor={"gray.400"} borderWidth={1}>
            <Text fontSize="md">Đơn sẵn sàng</Text>
            <Text fontSize="2xl" bold mt={2} >{5}</Text>
          </Box>
        </Pressable>

        <Pressable flex={1} onPress={() => {navigation.navigate('Revenue')}}>
          <Box  flex={1} bg="pink.200" p={2} rounded="md"  borderColor={"gray.400"} borderWidth={1}>
            <Text fontSize="md">Doanh thu</Text>
            <Text fontSize="md" bold mt={2}>1.200.000</Text>
          </Box>
        </Pressable>
       
      </HStack>

      <Text fontSize="2xl" bold mb={2}>Đơn gần đây</Text>
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Received')}
            bg="pink.50" p={3} mb={3}  rounded="md" borderColor={"gray.200"} borderWidth={1}
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
        shadow={3}
        icon={<Icon as={MaterialIcons} name="add" color="white" size="sm" />}
        onPress={() => navigation.navigate('NewOrder')}
      />
    </Box>
  );
}
