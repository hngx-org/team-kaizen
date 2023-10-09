import { View, Text, StyleSheet } from "react-native";
import React from 'react';




const Message = ({ message }) => {

    const isMe =()=>{
        return message.id==='u1';
    }

    return (
        <View
            style={[styles.container,
        {
          backgroundColor: isMe() ? "#DCF8C5" : "white",
          alignSelf: isMe() ? "flex-end" : "flex-start",
        }, ]} >
            <Text>{message.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      maxWidth: "80%",
  
      // Shadows
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
  
      elevation: 1,
    },
    time: {
      color: "gray",
      alignSelf: "flex-end",
    },
    images: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    imageContainer: {
      width: "50%",
      aspectRatio: 1,
      padding: 3,
    },
    image: {
      flex: 1,
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 5,
    },
  });

export default Message;