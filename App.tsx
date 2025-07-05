// App.tsx
import React from "react";
// import { NativeBaseProvider, extendTheme } from "native-base";
import { NativeBaseProvider, Text, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import Dashboard from "./src/screens/Dashboard";
import NewOrder from "./src/screens/NewOrder";
import Received from "./src/screens/ReceivedScreen";
import Ready from "./src/screens/ReadyScreen";
import Settings from "./src/screens/SettingsScreen";
import { PaperProvider } from "react-native-paper";
import Revenue from "./src/screens/Revenue";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerInput from "./src/screens/CustomerInput";
import { ReceivedOrder } from "./src/models/ReceivedOrder";
import OrderTem from "./src/screens/OrderTem";

// Tuỳ biến theme nếu cần
const theme = extendTheme({
  colors: {
    primary: {
      50: "#e3f2f9",
      500: "#3b82f6",
      700: "#1e40af",
    },
  },
});

export type RootTabParamList = {
  Dashboard: undefined;
  NewOrder: undefined;
  Received: undefined;
  Ready: undefined;
  Settings: undefined;
  Revenue: undefined;
};

export type NewOrderStackParamList = {
  NewOrder?: any;
  CustomerInput?: any;
  OrderTem: { orderData: ReceivedOrder };
}

const Tab = createBottomTabNavigator<RootTabParamList>();
const NewOrderStack = createNativeStackNavigator<NewOrderStackParamList>();
function NewOrderStackNavigator() {
  return (
    <NewOrderStack.Navigator>
      <NewOrderStack.Screen 
        name="NewOrder" 
        component={NewOrder}
        options={{ headerShown: false }} // Ẩn header của NewOrder
      />
      <NewOrderStack.Screen 
        name="CustomerInput" 
        component={CustomerInput}
        options={{ title: "Nhập thông tin khách hàng" }}

      />
      <NewOrderStack.Screen 
        name="OrderTem" 
        component={OrderTem}
        options={{ title: "In đơn hàng mới" }} 
      />

    </NewOrderStack.Navigator>
  );
}
export default function App() {
  return (
    <PaperProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
              headerStyle: { backgroundColor: theme.colors.primary?.[500] },
              headerTintColor: "white",
              headerTitleAlign: "center",
              tabBarIcon: ({ color, size }) => {
                let iconName = '';
                switch (route.name) {
                  case 'Dashboard':
                    iconName = 'home';
                    break;
                  case 'NewOrder':
                    iconName = 'add-circle';
                    break;
                  case 'Received':
                    iconName = 'download';
                    break;
                  case 'Ready':
                    iconName = 'checkmark-done';
                    break;
                  case 'Settings':
                    iconName = 'settings';
                    break;
                  case 'Revenue':
                    iconName = 'cash';
                  default:
                    iconName = 'ellipse';
                }
                return <Ionicons name={iconName as any} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary?.[700],
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: "Bảng điều khiển" }}
            />
            <Tab.Screen
              name="NewOrder"
              component={NewOrderStackNavigator}
              options={{ title: "Tạo đơn mới" }}
            />
            <Tab.Screen
              name="Received"
              component={Received}
              options={{ title: "Đơn đang chờ" }}
            />
            <Tab.Screen
              name="Ready"
              component={Ready}
              options={{ title: "Đơn đã sẵn sàng" }}
            />
            <Tab.Screen
              name="Revenue"
              component={Revenue}
              options={{ title: "Doanh thu" }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Cài đặt" }}
            />

            
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </PaperProvider>
  );
}