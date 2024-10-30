import React from 'react'
import App from './App.jsx'
import './index.css'

import * as ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { loader as optionLoader } from "./MainContent/Components/CardList.jsx"
import { loader as postLoader } from "./routes/Post.jsx"
import { loader as tagLoader} from "./routes/Tag.jsx"

import Root from './routes/Root.jsx';
import Login from './Topbar/Components/Login.jsx'
import Registration from "./Topbar/Components/Registration.jsx"
import Logout from "./Topbar/Components/Logout.jsx"
import AddPost from './Forms/Components/AddPost.jsx';
import ErrorPage from './error-page.jsx';
import CardList from './MainContent/Components/CardList.jsx';
import CardListTabular from './MainContent/Components/CardListTabular.jsx';
import CardListWithGivenTag from './MainContent/Components/CardListWithTag.jsx';
import EditPost from './Forms/Components/EditPost.jsx';
import DeletePost from './Forms/Components/DeletePost.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "new-post",
        element: <AddPost />
      },
      {
        path: "posts/:option",
        element: <CardList />,
        loader: optionLoader,
      },
      {
        path: "posts/mine",
        element: <CardListTabular />
      },
      {
        path: "posts/tag/:tagName",
        element: <CardListWithGivenTag />,
        loader: tagLoader
      },
      {
        path: "post/:post_id/edit",
        element: <EditPost />,
        loader: postLoader,
      },
      {
        path: "post/:post_id/delete",
        element: <DeletePost />,
        loader: postLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
