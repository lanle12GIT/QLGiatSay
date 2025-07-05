// src/screens/ReceivedScreen.tsx
import React from 'react';
import { Box, Button, FlatList, HStack, ScrollView, Text, VStack } from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';
import { Pressable } from 'react-native';
import { MOCK_RECEIVED_ORDERS } from '../db/ReceivedOrder';

type Props = BottomTabScreenProps<RootTabParamList, 'Received'>;

export default function ReceivedScreen({ navigation }: Props) {
  return (
    <Box flex={1} p={4} bg="white" >
      <Box  mb={5}>
        <Text fontSize={23} bold>Danh sách đơn hàng chưa hoàn tất </Text>
      </Box>

        
      <HStack mb={2} space={2}  >
        <Text fontSize={18} flex={2} bold bg="red.200">Khách hàng</Text>
        <Text fontSize={18} flex={2} bold bg="red.200">SĐT</Text>
        <Text fontSize={18} flex={2} bold bg="red.200">Ghi chú</Text>
        <Text flex={1}></Text>
      </HStack>
      <Box flex={5} bg="white" height={'56'} >
        <FlatList
          data={MOCK_RECEIVED_ORDERS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HStack
              backgroundColor="gray.100"
              rounded="md"
              mb={2}
              alignItems="center"
              py={2}
              px={1}
            >
              <Text flex={3} fontSize={14}>{item.name}</Text>
              <Text flex={3} fontSize={14}>{item.phone}</Text>
              <Text flex={2} fontSize={14}>{item.note}</Text>
              <Button
                flex={1}
                size="xs"
                variant="solid"
                colorScheme="blue"
                borderRadius="3xl"
                onPress={() =>{}}
              >
                Edit
              </Button>
            </HStack>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </Box>

      
    </Box>
  );
}
