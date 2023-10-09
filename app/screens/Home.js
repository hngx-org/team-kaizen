import { View,Text, StyleSheet, FlatList,  KeyboardAvoidingView,SafeAreaView  } from 'react-native';
import  { useState } from 'react';
import Message from '../components/Message';
import messages from '../assets/data/messages.json';
import InputBox from '../components/InputBox/Index';

import { useMessage } from '../contexts/MessageProvider';
// import {AsyncStorage} from 'react-native';

const Aichatscreen = () =>{

  const [newMessageItems, setNewMessageItems] = useState([
    {
      id: '',
      message: '',
    },
  ]);
  
    return (
      <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bg}
        >
         
          <View style={styles.bg}>
            <FlatList
              data={newMessageItems}
              renderItem={({ item }) => <Message message={item} />}
              style={styles.list}
             
            />
            <InputBox newMessageItems={newMessageItems} setNewMessageItems={setNewMessageItems}/>
          </View>
          
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
    flex: 1,

  },
  list: {
    padding: 10,
  },

});

export default Aichatscreen;
// import React from 'react';
// import {
//   StyleSheet,
//   View,
// } from 'react-native';
// import AppText from '../components/AppText';
// import DashboardLayout from '../layouts/DashboardLayout';

// function HomeScreen(): JSX.Element {

//   return (
//     <DashboardLayout>
//       <AppText> Home Page</AppText>
//     </DashboardLayout>
//   );
// }
// const styles = StyleSheet.create({});


// export default HomeScreen;
