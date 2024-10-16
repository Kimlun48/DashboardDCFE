//import Toaster
//import { Toaster } from 'react-hot-toast';

//import routes
import RoutesIndex from "./routes"
import { Toaster } from "react-hot-toast"
import LogoutOnClose from "./components/utilites/LogoutOnClose"
import React from "react"
import { UserPermissionsProvider } from "./components/utilites/UserPermissionsContext"
import GlobalBeforeUnloadListener from "./components/utilites/GlobalBeforeUnloadListener"

function App() {

  return (
    <>
    {/* <UserPermissionsProvider> */}
    {/* <GlobalBeforeUnloadListener /> */}
      <RoutesIndex />
      <Toaster />
      {/* <LogoutOnClose /> */}
      {/* </UserPermissionsProvider> */}
    </>
  )
}

export default App
//