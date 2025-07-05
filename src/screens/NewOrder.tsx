// src/screens/NewOrder.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Text, VStack, HStack, ScrollView,
  View
} from 'native-base';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';
import ServiceDropdown from '../components/ServiceDropdown';
import { TextInput } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewOrderStackParamList } from '../../App';
import { Category } from '../models/Category';
import { CATEGORIES } from '../db/Category';
import { MOCK_CUSTOMERS } from '../db/Customer';
import { ReceivedOrder } from '../models/ReceivedOrder';
import { addNewReceivedOrder } from '../db/ReceivedOrder';

type Props = NativeStackScreenProps<NewOrderStackParamList, 'NewOrder'>

interface CategoryWeight {
  category: Category;
  weight: string;
}

export default function NewOrder({ navigation, route }: Props) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [categoryWeights, setCategoryWeights] = useState<CategoryWeight[]>(
    CATEGORIES.map(cat => ({
      category: cat,
      weight: '0'
    }))
  );

  // Nhận dữ liệu từ CustomerInput
  useEffect(() => {
    if (route.params?.customerData) {
      const { phone, name } = route.params.customerData;
      setPhone(phone);
      setName(name);
    }
  }, [route.params]);

  const handleCustomerInputPress = () => {
    navigation.navigate('CustomerInput', {
      initialPhone: phone,
      initialName: name
    });
  };

  const suggestions = MOCK_CUSTOMERS.filter(c =>
    c.phone.includes(phone) || c.name.toLowerCase().includes(name.toLowerCase())
  );


  const calculateTotal = (categoryWeight: CategoryWeight) => {
    const weight = parseFloat(categoryWeight.weight) || 0;
    const price = parseFloat(categoryWeight.category.price) || 0;
    if (weight === 0 || price === 0) return '0'
    else return (
      (parseFloat(categoryWeight.category.price) * parseFloat(categoryWeight.weight) / 1000).toFixed(1)
    )
  };

  var totalPrice: number = 0;

  const onPressSaveAndPrint = () => {
    const orderData: ReceivedOrder = {
      name,
      phone,
      note,
      categoryWeights: categoryWeights.map(cat => ({
        categoryName: cat.category.name,
        weight: cat.weight,
        price: cat.category.price,
        categoryId: cat.category.id
      })),
      totalPrice: totalPrice.toFixed(1)
    };
    console.log('Order Data:', orderData);
    addNewReceivedOrder(orderData);
    navigation.navigate('OrderTem', {
      orderData: orderData
    });
  }

  return (
    <View bg="white" flex={1} flexDirection="column" px={4} py={3}>

      <Text fontSize="xl" bold>Thông tin đơn hàng</Text>

      <VStack space={3}>
        <Box>
          <TextInput
            placeholder="Tên khách hàng"
            value={name}
            onPress={handleCustomerInputPress}
            
          />
        </Box>

        <Box>
          <TextInput
            placeholder="SĐT khách hàng"
            value={phone}
            onPress={handleCustomerInputPress}
          />
        </Box>

        <Box mb={4}>
          <TextInput
            placeholder="Ghi chú"
            value={note}
            onChangeText={setNote}
          />
        </Box>
      </VStack>
      <Box>
        <ServiceDropdown></ServiceDropdown>
      </Box>

      <HStack mb={1} alignItems="center" space={2}>
        <Text flex={2} bold>Loại đồ</Text>
        <Text flex={2} bold>Giá (1000đ) </Text>
        <Text flex={2} bold textAlign="center">Khối lượng (kg)</Text>
        <Text flex={2} bold textAlign="center">Thành tiền (1000đ)</Text>
      </HStack>

      <ScrollView mt={2} >
        <Box height={'100%'}>

          {categoryWeights.map((categoryWeight: CategoryWeight, idx) => {

            return (
              <ScrollView key={idx}>
                <HStack key={idx} space={2} alignItems="center" mb={1}>
                  <Text flex={2}>{categoryWeight.category.name}</Text>
                  <Text flex={2}>{categoryWeight.category.price}</Text>
                  <TextInput
                    value={categoryWeight.weight}
                    style={{ flex: 2, textAlign: 'center', fontSize: 13 }}
                    placeholder="KL"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const newCategoryWeights = [...categoryWeights];
                      newCategoryWeights[idx].weight = text;
                      setCategoryWeights(newCategoryWeights);

                    }}

                  />
                  <Text flex={2} textAlign="right">

                    {
                      calculateTotal(categoryWeight)
                    }K
                  </Text>


                </HStack>
              </ScrollView>
            );
          })}
        </Box>
      </ScrollView>



      <HStack alignItems="center" justifyContent="flex-end">
        <Text bold fontSize="md">Tổng tiền:&nbsp;</Text>
        {categoryWeights.forEach((categoryWeight: CategoryWeight) => {
          totalPrice += parseFloat(calculateTotal(categoryWeight));
        })}
        <Text bold fontSize="md" color="primary.600">{totalPrice} K</Text>
      </HStack>
      <Button
        onPress={onPressSaveAndPrint}
      >
        Lưu & In Tem
      </Button>
    </View>
  );
}
