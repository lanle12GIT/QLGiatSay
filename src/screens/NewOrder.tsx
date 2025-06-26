// src/screens/NewOrder.tsx
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
  Box, Input, Button, Text, VStack, Pressable, HStack,
  Select, CheckIcon, Divider, ScrollView,
  View
} from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';
import ServiceDropdown from '../components/ServiceDropdown';
import { TextInput } from 'react-native-paper';
import MaterialDropdown from '../components/MaterialDropdown';

type Props = BottomTabScreenProps<RootTabParamList, 'NewOrder'>;

interface Customer { id: string; name: string; phone: string; }

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0912345678' },
  { id: '2', name: 'Trần Thị B', phone: '0987654321' },
];

export default function NewOrder1({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [materials, setMaterials] = useState([{ name: '', weight: '', price: '' }]);
  const [serviceType, setServiceType] = useState('');
  const [note, setNote] = useState('');

  const suggestions = MOCK_CUSTOMERS.filter(c =>
    c.phone.includes(phone) || c.name.toLowerCase().includes(name.toLowerCase())
  );

  const canSave = phone.length >= 3 && name.length >= 2
    && materials.every(m => !!m.name && !!m.weight) && !!serviceType;

  const handleSelectCustomer = (item: Customer) => {
    setPhone(item.phone);
    setName(item.name);
  };

  // Tính tổng tiền
  const totalAmount = materials.reduce((sum, item) => {
    const weightNum = parseFloat(item.weight) || 0;
    const priceNum = parseFloat(item.price) || 0;
    return sum + weightNum * priceNum;
  }, 0);

  return (
    <View bg="white" flex={1} px={4} py={3}>

      <Text fontSize="2xl" bold mb={4}>Đơn mới 1</Text>
      <VStack space={4}>

        <TextInput
          placeholder="SĐT khách hàng"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="Tên khách hàng"
          value={name}
          onChangeText={setName}
        />

        {(phone || name) && suggestions.length > 0 && (
          <Box borderWidth={1} borderColor="gray.300" rounded="md" bg="gray.50" px={2}>
            <FlatList
              data={suggestions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectCustomer(item)}>
                  <Box py={2}>
                    <Text>{item.name} - {item.phone}</Text>
                  </Box>
                </Pressable>
              )}
            />
          </Box>
        )}

        <TextInput
          placeholder="Ghi chú"
          value={note}
          onChangeText={setNote}
        />
       
      
        <Box>
          <HStack mb={2} alignItems="center" space={2}>
            <Text flex={2} bold>Tên vật liệu</Text>
            <Text flex={1} bold textAlign="center">Khối lượng (kg)</Text>
            <Text flex={1} bold textAlign="center">Giá thành (đ)</Text>
            <Text flex={1} bold textAlign="center">Thành tiền (đ)</Text>
          </HStack>
          {materials.map((item, idx) => {
            const weightNum = parseFloat(item.weight) || 0;
            const priceNum = parseFloat(item.price) || 0;
            const total = weightNum * priceNum;
            return (
              <HStack key={idx} space={2} alignItems="center" mb={1}>
                <TextInput
                  style={{ flex: 2 }}
                  placeholder="Tên vật liệu"
                  value={item.name}
                  onChangeText={text => {
                    const arr = [...materials];
                    arr[idx].name = text;
                    setMaterials(arr);
                  }}
                />
                <TextInput
                  style={{ flex: 1, textAlign: 'center', fontSize:13 }}
                  placeholder="Kl"
                  keyboardType="numeric"
                  value={item.weight}
                  onChangeText={text => {
                    const arr = [...materials];
                    arr[idx].weight = text;
                    setMaterials(arr);
                  }}
                />
                <TextInput
                  style={{ flex: 1, textAlign: 'center', fontSize:12 }}
                  placeholder="Giá"
                  keyboardType="numeric"
                  value={item.price}
                  onChangeText={text => {
                    const arr = [...materials];
                    arr[idx].price = text;
                    setMaterials(arr);
                  }}
                />
                <Text flex={1} textAlign="center">{total ? total.toLocaleString() : ''}</Text>
                <Button size="xs" colorScheme="danger" variant="ghost" onPress={() => {
                  setMaterials(materials.filter((_, i) => i !== idx));
                }}>X</Button>
              </HStack>
            );
          })}
          <Button mt={2} size="sm" variant="outline" onPress={() => setMaterials([...materials, { name: '', weight: '', price: '' }])}>
            + Thêm vật liệu
          </Button>
          <Divider my={2} />
          <HStack mt={2} alignItems="center" justifyContent="flex-end">
            <Text bold fontSize="md">Tổng tiền:&nbsp;</Text>
            <Text bold fontSize="lg" color="primary.600">{totalAmount ? totalAmount.toLocaleString() : '0'} đ</Text>
          </HStack>
        </Box>

        <ServiceDropdown></ServiceDropdown>



        <Divider my={2} />

        <Button
          isDisabled={!canSave}
          onPress={() => navigation.navigate('Received')}
        >
          Lưu & In Tem
        </Button>
      </VStack>
    </View>
  );
}
