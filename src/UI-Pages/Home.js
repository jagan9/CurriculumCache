import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

function Home(){
    return(
        <div>
            <Header/>
            <p>
                loreUse this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).  
            </p>
            
        </div>
    );
}

export default Home;