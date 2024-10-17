"use client"





import { createContext, useEffect, useReducer } from "react";
import Reducer from "./reducer";

// Wrap this check in a try-catch block to handle potential errors in parsing JSON
function getParsedItem(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null; // Return a default value if parsing fails
  }
}

const nameFromLocalStorage = getParsedItem("name");
const emailFromLocalStorage = getParsedItem("email");
const payerFromLocalStorage = getParsedItem("payer");
const subscriberFromLocalStorage = getParsedItem("subscriber");
const titleFromLocalStorage = getParsedItem("title");
const messageFromLocalStorage = getParsedItem("message");



const INITIAL_STATE = {
  name: nameFromLocalStorage || false,
  email:emailFromLocalStorage || false,
  payer:payerFromLocalStorage|| false,
  subscriber:subscriberFromLocalStorage|| false,
  title:titleFromLocalStorage|| false,
  message:messageFromLocalStorage|| false,

 


};

const Context = createContext(INITIAL_STATE);

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(state.name));
    localStorage.setItem("email", JSON.stringify(state.email)); 
    localStorage.setItem("payer", JSON.stringify(state.payer)); 
    localStorage.setItem("subscriber", JSON.stringify(state.subscriber)); 
    localStorage.setItem("title", JSON.stringify(state.title)); 
    localStorage.setItem("message", JSON.stringify(state.message)); 


    
  }, [state.name,  state.email, state.payer, state.subscriber , state.title , state.message]);
  

  return (
    <Context.Provider
      value={{
        name: state.name,
        email:state.email,
        payer:state.payer,
        subscriber:state.subscriber,
        title:state.title,
        message:state.message,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
