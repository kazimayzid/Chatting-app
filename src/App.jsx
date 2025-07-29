import "./App.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./pages/Home/Home";
import Message from "./pages/Message/Message";
import Settings from "./pages/Settings/Settings";
import { ForgetPassword } from "./pages/ForgetPassword/ForgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootlayOut from "./components/RootlayOut/RootlayOut";
const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootlayOut />,
    children: [
      { index: true, Component: Home },
      { path: "message", Component: Message },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
