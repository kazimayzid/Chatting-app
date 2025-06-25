import "./App.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration/>
  },
  {
    path: "/Login",
    element: <Login/>
  }
])

function App() {
  return <>
  <RouterProvider router={router} />
  </>;
}

export default App;
