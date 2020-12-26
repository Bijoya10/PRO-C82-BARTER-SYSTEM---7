import * as React from "react";
import {Header} from "react-native-elements";
import App from "../App";

const MyHeader=(props)=>{
  
        return(
            <Header
                backgroundColor="#6CB54A"
                centerComponent={{text: "Barter App",style:{fontWeight:"bold",color:"#FFF2F3",height:50,fontSize:30}}}
            />
        )
    
}
export default MyHeader;