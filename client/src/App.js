import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { About } from "./pages/About/About";
import "./app.css";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { CoachInfo } from "./pages/CoachInfo/CoachInfo";
import { Posts } from "./pages/Posts/Posts";
import { Contact } from "./pages/Contact/Contact";
import { SinglePost } from "./pages/SinglePost/SinglePost";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { MessageWasSent } from "./pages/MessageWasSent/MessageWasSent";
import { AddPost } from "./pages/AddPost/AddPost";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "about/:id",
        element: <CoachInfo />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <SinglePost />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "messageSent",
        element: <MessageWasSent />,
      },
      {
        path: "addPost",
        element: <AddPost />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
