import { Menu, Button, Divider } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ServiceDropdown() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (label: string) => {
    setSelected(label);
    setVisible(false);
  };

  const options = [
    { label: 'Giặt + Sấy', icon: 'washing-machine' },
    { label: 'Chỉ Giặt', icon: 'water' },
    { label: 'Chỉ Sấy', icon: 'weather-sunny' },
  ];

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button onPress={() => setVisible(true)} mode="outlined">
            {selected || 'Chọn dịch vụ'}
          </Button>
        }
      >
        {options.map(opt => (
          <Menu.Item
            key={opt.label}
            onPress={() => handleSelect(opt.label)}
            title={opt.label}
            leadingIcon={() => (
              <MaterialCommunityIcons name={opt.icon} size={20} color="#555" />
            )}
            titleStyle={{ fontSize: 16 }}
            contentStyle={{ paddingVertical: 4 }}
          />
        ))}
        <Divider />
      </Menu>
    </View>
  );
}
