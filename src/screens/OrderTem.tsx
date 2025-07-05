import React from 'react';
import { Text, View, Button, VStack, HStack, Box, Divider } from "native-base";
import { Alert, Platform } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

interface OrderData {
  name: string;
  phone: string;
  note: string;
  totalPrice: string;
  categoryWeights: Array<{
    categoryName: string;
    weight: string;
    price: string;
    categoryId: string;
  }>;
}

interface Props {
  route: {
    params: {
      orderData: OrderData;
    };
  };
}

export default function OrderTem({ route }: Props) {
  const { orderData } = route.params;

  // HTML cho máy in nhiệt 58mm (tối ưu cho thermal printer)
  const generateThermalHTML = () => {
    const itemRows = orderData.categoryWeights
      .filter(item => parseFloat(item.weight) > 0)
      .map(item => {
        const total = (parseFloat(item.price) * parseFloat(item.weight) / 1000).toFixed(1);
        return `
          <div class="item-row">
            <div class="item-name">${item.categoryName}</div>
            <div class="item-details">${item.weight}kg x ${item.price}đ = ${total}K</div>
          </div>
        `;
      }).join('');

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: 'Courier New', monospace;
              margin: 0;
              padding: 8px;
              font-size: 12px;
              line-height: 1.2;
              width: 58mm;
              color: #000;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header { 
              text-align: center; 
              margin-bottom: 8px;
              border-bottom: 1px dashed #000;
              padding-bottom: 4px;
            }
            .shop-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 2px;
            }
            .shop-info {
              font-size: 10px;
              margin-bottom: 1px;
            }
            .customer-info { 
              margin-bottom: 8px; 
              font-size: 11px;
            }
            .customer-row {
              margin-bottom: 2px;
            }
            .item-row {
              margin-bottom: 4px;
              font-size: 11px;
            }
            .item-name {
              font-weight: bold;
            }
            .item-details {
              margin-left: 4px;
              font-size: 10px;
            }
            .separator {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }
            .total-section {
              margin-top: 8px;
              padding-top: 4px;
              border-top: 1px dashed #000;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 4px;
            }
            .note-section {
              margin-top: 6px;
              font-size: 10px;
              font-style: italic;
            }
            .footer {
              margin-top: 10px;
              text-align: center;
              font-size: 9px;
              border-top: 1px dashed #000;
              padding-top: 4px;
            }
            .datetime {
              font-size: 10px;
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="shop-name">GIẶT ỦI ABC</div>
            <div class="shop-info">123 Đường ABC, Quận XYZ</div>
            <div class="shop-info">ĐT: 0123.456.789</div>
          </div>
          
          <div class="customer-info">
            <div class="customer-row"><strong>KH:</strong> ${orderData.name}</div>
            <div class="customer-row"><strong>SĐT:</strong> ${orderData.phone}</div>
            <div class="datetime"><strong>Ngày:</strong> ${new Date().toLocaleString('vi-VN')}</div>
          </div>

          <div class="separator"></div>
          
          <div class="bold center">CHI TIẾT ĐƠN HÀNG</div>
          
          ${itemRows}

          <div class="total-section">
            <div class="total-row">
              <span>TỔNG TIỀN:</span>
              <span>${orderData.totalPrice}K</span>
            </div>
          </div>

          ${orderData.note ? `
            <div class="note-section">
              <strong>Ghi chú:</strong> ${orderData.note}
            </div>
          ` : ''}

          <div class="footer">
            <div>Cảm ơn quý khách!</div>
            <div>Giữ phiếu để nhận đồ</div>
          </div>
        </body>
      </html>
    `;
  };

  // HTML cho máy in nhiệt 80mm (rộng hơn một chút)
  const generateThermal80mmHTML = () => {
    const itemRows = orderData.categoryWeights
      .filter(item => parseFloat(item.weight) > 0)
      .map(item => {
        const total = (parseFloat(item.price) * parseFloat(item.weight) / 1000).toFixed(1);
        return `
          <tr>
            <td class="left">${item.categoryName}</td>
            <td class="center">${item.weight}kg</td>
            <td class="right">${total}K</td>
          </tr>
        `;
      }).join('');

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: 'Courier New', monospace;
              margin: 0;
              padding: 6px;
              font-size: 12px;
              line-height: 1.3;
              width: 80mm;
            }
            .center { text-align: center; }
            .left { text-align: left; }
            .right { text-align: right; }
            .bold { font-weight: bold; }
            
            .header { 
              text-align: center; 
              margin-bottom: 10px;
              border-bottom: 1px dashed #000;
              padding-bottom: 6px;
            }
            .shop-name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 3px;
            }
            .shop-info {
              font-size: 11px;
              margin-bottom: 1px;
            }
            
            .customer-info { 
              margin-bottom: 10px; 
              font-size: 12px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 8px 0;
            }
            th, td {
              padding: 2px 4px;
              font-size: 11px;
            }
            th {
              border-bottom: 1px dashed #000;
              font-weight: bold;
              text-align: center;
            }
            
            .total-section {
              margin-top: 10px;
              padding-top: 6px;
              border-top: 1px dashed #000;
              font-size: 14px;
              font-weight: bold;
              text-align: right;
            }
            
            .note-section {
              margin-top: 8px;
              font-size: 11px;
              font-style: italic;
            }
            
            .footer {
              margin-top: 12px;
              text-align: center;
              font-size: 10px;
              border-top: 1px dashed #000;
              padding-top: 6px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="shop-name">GIẶT ỦI ABC</div>
            <div class="shop-info">123 Đường ABC, Quận XYZ</div>
            <div class="shop-info">ĐT: 0123.456.789</div>
          </div>
          
          <div class="customer-info">
            <div><strong>Khách hàng:</strong> ${orderData.name}</div>
            <div><strong>Số ĐT:</strong> ${orderData.phone}</div>
            <div><strong>Ngày:</strong> ${new Date().toLocaleString('vi-VN')}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th class="left">Dịch vụ</th>
                <th class="center">KL</th>
                <th class="right">Tiền</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>

          <div class="total-section">
            TỔNG: ${orderData.totalPrice}K VNĐ
          </div>

          ${orderData.note ? `
            <div class="note-section">
              <strong>Ghi chú:</strong> ${orderData.note}
            </div>
          ` : ''}

          <div class="footer">
            <div>Cảm ơn quý khách đã sử dụng dịch vụ!</div>
            <div>Vui lòng giữ phiếu này để nhận đồ</div>
          </div>
        </body>
      </html>
    `;
  };

  const handlePrintThermal58mm = async () => {
    try {
      const html = generateThermalHTML();
      
      await Print.printAsync({
        html,
        width: 226,
        height: 800,
        orientation: Print.Orientation.portrait,
        useMarkupFormatter: true,
      });
    } catch (error) {
      console.error('Thermal print error:', error);
      Alert.alert('Lỗi', 'Không thể in được. Vui lòng thử lại.');
    }
  };

  const handlePrintThermal80mm = async () => {
    try {
      const html = generateThermal80mmHTML();
      
      await Print.printAsync({
        html,
        width: 302,
        height: 800,
        orientation: Print.Orientation.portrait,
        useMarkupFormatter: true,
      });
    } catch (error) {
      console.error('Thermal print error:', error);
      Alert.alert('Lỗi', 'Không thể in được. Vui lòng thử lại.');
    }
  };

  const handleCreatePDF = async () => {
    try {
      const html = generateThermal80mmHTML();
      
      const { uri } = await Print.printToFileAsync({
        html,
        width: 302,
        height: 800,
        base64: false,
      });

      console.log('PDF created at:', uri);
      
      await shareAsync(uri, { 
        UTI: '.pdf', 
        mimeType: 'application/pdf',
        dialogTitle: 'Chia sẻ phiếu giặt ủi'
      });
    } catch (error) {
      console.error('PDF creation error:', error);
      Alert.alert('Lỗi', 'Không thể tạo PDF được.');
    }
  };

  return (
    <View flex={1} p={4} bg="white">
      <VStack space={4}>
        <Box>
          <Text fontSize="xl" bold textAlign="center">PHIẾU GIẶT ỦI</Text>
        </Box>

        <Box>
          <Text fontSize="md" bold>Thông tin khách hàng:</Text>
          <Text>Tên: {orderData.name}</Text>
          <Text>SĐT: {orderData.phone}</Text>
          <Text>Ngày: {new Date().toLocaleDateString('vi-VN')}</Text>
        </Box>

        <Divider />

        <Box>
          <Text fontSize="md" bold mb={2}>Chi tiết đơn hàng:</Text>
          <HStack bg="gray.200" p={2} rounded="md">
            <Text flex={2} bold>Loại đồ</Text>
            <Text flex={1} bold>KL (kg)</Text>
            <Text flex={1} bold>Giá</Text>
            <Text flex={1} bold>Tiền</Text>
          </HStack>
          
          {orderData.categoryWeights
            .filter(item => parseFloat(item.weight) > 0)
            .map((item, index) => {
              const total = (parseFloat(item.price) * parseFloat(item.weight) / 1000).toFixed(1);
              return (
                <HStack key={index} p={2} bg={index % 2 === 0 ? "white" : "gray.50"}>
                  <Text flex={2}>{item.categoryName}</Text>
                  <Text flex={1}>{item.weight}</Text>
                  <Text flex={1}>{item.price}đ</Text>
                  <Text flex={1}>{total}K</Text>
                </HStack>
              );
            })
          }
        </Box>

        <Divider />

        <Box alignItems="flex-end">
          <Text fontSize="lg" bold>Tổng tiền: {orderData.totalPrice}K VNĐ</Text>
        </Box>

        {orderData.note && (
          <Box>
            <Text fontSize="md" bold>Ghi chú:</Text>
            <Text>{orderData.note}</Text>
          </Box>
        )}

        <VStack space={3} mt={6}>
          <Button onPress={handlePrintThermal58mm} colorScheme="blue">
            In nhiệt 58mm
          </Button>
          <Button onPress={handlePrintThermal80mm} colorScheme="green">
            In nhiệt 80mm
          </Button>
          <Button onPress={handleCreatePDF} variant="outline">
            Tạo PDF & Chia sẻ
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}