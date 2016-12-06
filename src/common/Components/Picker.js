import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Picker as PickerNB} from 'native-base';

const styles = StyleSheet.create({
    group: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      width: 150,
    },
    labelText: {
      fontSize: 15,
      color: '#000'
    },
    input: {
      flex: 1,
    },
    pickerSelf: {
      alignSelf: 'flex-end',
    },
});

const Picker = ({ label, selectedItem, items, onItemChange, ...pickerProps }) => {
  const Items = items.map((item, idx) => <PickerNB.Item key={idx} label={item.label} value={item.value} />);
  return (
    <View style={styles.group}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.input}>
        <PickerNB
          style={styles.pickerSelf}
          {...pickerProps}
          selectedValue={selectedItem}
          onValueChange={val => onItemChange(val)}>
            {Items}
        </PickerNB>
      </View>
    </View>
  );
}
export default Picker;
