// import React, { createContext, useContext, useEffect, useState } from "react";

// const MessageContext = createContext() 

// const MessageProvider = ({children}) =>{

//     const [newMessageItems, setNewMessageItems] = useState([]);

   

//     useEffect(() => {
//         console.log("MessageproviderContext");
//     }, []);
       
//       }

//     return(
//         <MessageContext.Provider value ={{newMessageItems, setNewMessageItems, onSend}}>
//             {children}
//         </MessageContext.Provider>
//     )
// }

// export const useMessage = () => useContext(MessageContext);

// export default MessageProvider;