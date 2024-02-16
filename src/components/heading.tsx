import React from 'react';
import { Text } from 'react-native';

export default function Heading(props) {
  return (
    <Text className="text-4xl font-extrabold text-textDark">
      {props.content}
    </Text>
  );
}
