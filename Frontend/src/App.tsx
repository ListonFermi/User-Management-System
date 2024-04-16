import { Provider } from "react-redux"
import Body from "./Pages/Body"
import appstore from "./Utils/appstore"

function App() {

  return (
    <>
     <Provider store={appstore}><Body/></Provider>
    </>
  )
}

export default App
