import { FaTruckMonster } from "react-icons/fa";

const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGOUT_SUCCESS_USER":
        return {
          name: null,
          email:null,
          payer:null,
          subscriber:null,
          
          
        };
      case "LOGIN_SUCCESS_USER":
        return {
          name: action.name,
          email:action.email,
          payer:null,
          subscriber:null,
         
        };



        case "LOGIN_SUCCESS_PAYER":
          return {
            name: action.name !== undefined ? action.name : state.name,  
            email: action.email !== undefined ? action.email : state.email,
            payer:true,
            subscriber:null,
           
          };
          case "LOGIN_SUCCESS_SUBSCRIBER":
            return {
              name: action.name !== undefined ? action.name : state.name,   // Use action.user if provided, otherwise keep state.user
              email: action.email !== undefined ? action.email : state.email, // Use action.email if provided, otherwise keep state.email
              payer: true,
              subscriber: action.subscriber,
            };




            case "LOGIN_SUBSCRIBER_FINISHED":
              return {
                name:state.name,
                email:state.email,
                payer:null,
                subscriber:null,
               
              };

    
            case "MESSAGE":
              return {
                name:state.name,
                email:state.email,
                payer:state.payer,
                subscriber:state.subscriber,
                title : action.title,
                message : action.message,

               
              };
  
              case "NO_MESSAGE":
                return {
                  name:state.name,
                  email:state.email,
                  payer:state.payer,
                  subscriber:state.subscriber,
                  title : null,
                  message : null,
  
                 
                };
    


        case "CHECK_DATA":
        return {
          ...state,
         

         
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
