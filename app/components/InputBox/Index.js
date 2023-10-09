import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';

    

   

const InputBox = (props) => {

  const { newMessageItems, setNewMessageItems } = props;

  const [newMessage, setNewMessage] = useState('');
  const lastRequest = {
    user_input: newMessage
  };
  const newRequest = {
    id: 'u1', // Add the id field
    message:  newMessage// ...lastRequest // Include data from lastRequest
  };

  const getOpenAiResponse = () => {
    fetch('https://spitfire-interractions.onrender.com/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lastRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('We have gotten response');
        console.log(response.status);
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        console.log('this is data returned from open api below:');
        console.log(data);
        const aiMessage = {
          id: 'u2', // Add the id field
          message: data.message,
        };
        setNewMessageItems((prevMessages) => [
          ...prevMessages,
          // Add the user's message
          aiMessage, // Add the AI's response
        ]);
        console.log(newMessageItems);
      })
      .catch((error) => {
        console.log('Error with callback' + error);
      });
  };
  
  const onSend = () => {
    const userMessage = {
      id: 'u1', // Assuming 'u1' represents the user
      message: newMessage,
    };
  
    // Update the state to add the user's message
    setNewMessageItems([...newMessageItems, userMessage]);
  
    // Clear the input field
    setNewMessage('');
  
    // Make the API request
    console.log('About to make api request1');
    getOpenAiResponse();
  };
  
//   const getOpenAiResponse = () => {
//     fetch('https://spitfire-interractions.onrender.com/api/chat/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(lastRequest)
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       console.log("We have gotten response");
//       console.log(response.status);
//       console.log(response.body);
//       return response.json();
//     })
//     .then(data => {
//         console.log('this is data returned from open api below:');
//         console.log(data);
//         const aiMessage = {
//           id: 'u2', // Add the id field
//           message: data.message,
//         };
//         setNewMessageItems([...newMessageItems, aiMessage]);
//         console.log(newMessageItems);
//         })
//     .catch((error) => {
//         console.log("Error with callback" + error);
//     })
//   };


// const onSend = async () => {
//     console.log("About to make api request1");
//     setNewMessageItems([...newMessageItems, newRequest]);
//     console.log(newMessageItems);
//     setNewMessage(null);
//     getOpenAiResponse();
//     console.log("Finished making request");
//     console.log(response);


    
//     }

  return (
    <View style={styles.container}>
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        multiline
        style={styles.input}
        />
      <MaterialIcons style={styles.send} onPress={onSend} name="send" size={24} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "whitesmoke",
      padding: 5,
      alignItems: "center",
    },
    input: {
      fontSize: 18,
  
      flex: 1,
      backgroundColor: "white",
      padding: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
  
      borderRadius: 50,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "lightgray",
    },
    send: {
      backgroundColor: "royalblue",
      padding: 7,
      borderRadius: 15,
      overflow: "hidden",
    },
  });

export default InputBox;

