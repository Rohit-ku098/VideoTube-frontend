import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import App from "./App.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Layout from "./components/Layout.jsx";
import Video from "./pages/Video.jsx"; 
import ChannelVideos from "./components/Video/ChannelVideos.jsx";
import UploadVideo from "./components/Video/UploadVideo.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ToastProvider from "./context/ToastProvider.jsx";
import Profile from "./pages/Profile.jsx";
import PlaylistFeed from "./pages/PlaylistFeed.jsx";
import Playlist from "./pages/Playlist.jsx";
import ThemeProvider from "./context/Theme/ThemeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <AuthLayout>
                <Home />
              </AuthLayout>
            ),
          },
          {
            path: "/video/:videoId",
            element: (
              // <Video/>
              <AuthLayout authentication={true}>
                <Video />
              </AuthLayout>
            ),
          },
          {
            path: "/upload",
            element: (
              <AuthLayout authentication={true}>
                <UploadVideo />
              </AuthLayout>
            ),
          },
          {
            path: "/search",
            element: (
              <AuthLayout authentication={true}>
                <SearchPage />
              </AuthLayout>
            ),
          },
          {
            path: "/channel/:userName",
            element: (
              <AuthLayout authentication={true}>
                <Profile />
              </AuthLayout>
            ),
            children: [
              {
                path: "/channel/:userName/videos",
                element: (
                  <AuthLayout>
                    <ChannelVideos/>
                  </AuthLayout>
                ),
              },
              {
                path: "/channel/:userName/playlist",
                element: (
                  <AuthLayout>
                    <PlaylistFeed />
                  </AuthLayout>
                ),
              },
            ],
          },
          {
            path: "/playlist/feed/:userId",
            element: (
              <AuthLayout authentication={true}>
                <PlaylistFeed />
              </AuthLayout>
            ),
          },
          {
            path: "/playlist/:playlistId",
            element: (
              <AuthLayout authentication={true}>
                <Playlist />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  //</React.StrictMode>
);
