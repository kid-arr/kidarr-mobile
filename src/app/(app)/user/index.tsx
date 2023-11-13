import React from 'react';
import { FlatList, Text, View } from 'react-native';

interface ListItem {
  id: string;
  title: string;
}

interface Props {
  data: ListItem[];
}

const ChildHomePage: React.FC<Props> = ({ data }) => {
  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={{ padding: 16 }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ChildHomePage;
