import * as React from "react";
import {Header} from "react-native-elements";
import App from "../App";

const MyHeader=(props)=>{
  
        return(
            <Header
                backgroundColor="#0073e5"
                centerComponent={{text: "Barter App",style:{fontWeight:"bold",color:"white",fontSize:30}}}
            />
        )
    
}
export default MyHeader;