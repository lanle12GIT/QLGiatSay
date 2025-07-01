import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import {
  Box, Button, Text, VStack, Pressable, HStack, View
} from 'native-base';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewOrderStackParamList } from '../../App';

type Props = NativeStackScreenProps<NewOrderStackParamList, 'CustomerInput'>;

interface Customer { 
  id: string; 
  name: string; 
  phone: string; 
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0912345678' },
  { id: '2', name: 'Trần Thị B', phone: '0987654321' },
  { id: '3', name: 'Lê Văn C', phone: '0909123456' },
  { id: '4', name: 'Phạm Thị D', phone: '0898765432' },
];

export default function CustomerInput({ navigation, route }: Props) {
  const [phone, setPhone] = useState(route.params?.CustomerInput?.initialPhone || '');
  const [name, setName] = useState(route.params?.CustomerInput?.initialName || '');
  const [searchTerm, setSearchTerm] = useState('');

  const suggestions = MOCK_CUSTOMERS.filter(c =>
    c.phone.includes(searchTerm) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCustomer = (item: Customer) => {
    setPhone(item.phone);
    setName(item.name);
  };

  const handleSave = () => {
    // Truyền dữ liệu về màn hình trước
    navigation.navigate('NewOrder', {
      customerData: { phone, name }
    });
  };

  return (
    <View bg="white" flex={1} px={4} py={3}>
      <VStack space={4}>
        <Box>
          <Text mb={2} fontSize="md">Tìm kiếm khách hàng</Text>
          <TextInput
            placeholder="Nhập tên hoặc SĐT để tìm kiếm"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </Box>

        {searchTerm && suggestions.length > 0 && (
          <Box borderWidth={1} borderColor="gray.300" rounded="md" maxHeight={200}>
            <FlatList
              data={suggestions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectCustomer(item)}>
                  <Box p={3} borderBottomWidth={1} borderBottomColor="gray.200">
                    <Text fontSize="md" bold>{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">{item.phone}</Text>
                  </Box>
                </Pressable>
              )}
            />
          </Box>
        )}

        <Box>
          <Text mb={2} fontSize="md">Tên khách hàng</Text>
          <TextInput
            placeholder="Nhập tên khách hàng"
            value={name}
            onChangeText={setName}
          />
        </Box>

        <Box>
          <Text mb={2} fontSize="md">Số điện thoại</Text>
          <TextInput
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </Box>

        <HStack space={3} mt={6}>
          <Button 
            flex={1} 
            variant="outline"
            onPress={() => navigation.goBack()}
          >
            Hủy
          </Button>
          <Button 
            flex={1}
            onPress={handleSave}
            isDisabled={!phone || !name}
          >
            Xác nhận
          </Button>
        </HStack>
      </VStack>
    </View>
  );
}