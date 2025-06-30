import "./App.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./pages/Home/Home"
import Message from "./pages/Message/Message";
import Settings from "./pages/Settings/Settings";
import { ForgetPassword } from "./pages/ForgetPassword/ForgetPassword";
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
    path: "/login",
    element: <Login/>
  },{
    path:"/home",
    element: <Home/>
  },
  {
    path: "/message",
    element: <Message/>
  },
   {
    path: "/settings",
    element: <Settings/>
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword/>
  }
])

function App() {
  return <>
  <RouterProvider router={router} />
  </>;
}

export default App;
