import React from "react";
import { Route, Redirect } from "react-router-dom";
import Logout from "./Logout";
import MangerHOC from "./Redux/HOC/ManagerHOC";
import WfmHOC from "./Redux/HOC/WfmHOC";
import WFMHome from "./WFM/Home";



const ProtectedRoute = ({ children, ...rest }:any) => {
  const token= localStorage.getItem("token");
const usertype =  localStorage.getItem("usertype")
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token? usertype==="manager"?(
          
          <> 
          <Logout></Logout>
          <MangerHOC/></>
        ):( <> <Logout></Logout><WfmHOC/></>) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
