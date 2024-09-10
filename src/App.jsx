//import Toaster
//import { Toaster } from 'react-hot-toast';

//import routes
import RoutesIndex from "./routes"
import { Toaster } from "react-hot-toast"
import LogoutOnClose from "./components/utilites/LogoutOnClose"

function App() {

  return (
    <>
      <RoutesIndex />
      <Toaster />
      {/* <LogoutOnClose /> */}
    </>
  )
}

export default App
//