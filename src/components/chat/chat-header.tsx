import React from 'react';
import { Text } from 'react-native';

const ChatHeader = () => {
  return (
    <Text>Header</Text>
    // <Header
    //   barStyle="dark-content"
    //   centerComponent={{
    //     text: 'Chat Messages',
    //     style: { color: colours.lightGrey },
    //   }}
    //   leftComponent={{ icon: 'menu', color: colours.lightGrey }}
    //   placement="center"
    //   rightComponent={{ icon: 'home', color: colours.lightGrey }}
    // />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: colours.grey,
//   },

//   profileOptions: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   profile: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#fff',
//     flex: 4,
//   },
//   image: {
//     height: 65,
//     width: 65,
//     borderRadius: 32.5,
//   },
//   usernameAndOnlineStatus: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   username: {
//     color: colours.white,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   onlineStatus: {
//     color: colours.white,
//     fontSize: 16,
//   },
//   options: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });

export default ChatHeader;
