import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      className="py-3 mt-3 rounded-xl"
      style={{ elevation: 1, backgroundColor: props.bgColor }}
      onPress={() => props.navigation.navigate(props.goto)}
    >
      <Text
        className="text-base text-center"
        style={{ color: props.textColor }}
      >
        {props.content}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
