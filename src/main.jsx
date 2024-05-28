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
import Profile from "./pages/Profile.jsx";
import PlaylistFeed from "./pages/PlaylistFeed.jsx";
import Playlist from "./pages/Playlist.jsx";
import ThemeProvider from "./context/Theme/ThemeProvider.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import Blog from "./pages/Blog.jsx";
import ChannelBlog from "./components/Blog/ChannelBlog.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardVideos from "./components/Dashboard/DashboardVideo.jsx";
import DashboardPlaylist from "./components/Dashboard/DashboardPlaylist.jsx";
import EditVideo from "./components/Video/EditVideo.jsx";
import Setting from "./pages/Setting.jsx";

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
              <AuthLayout authentication={true}>
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
            path: "/video/edit",
            element: (
              <AuthLayout>
                <EditVideo/>
              </AuthLayout>
            )
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
                path: "/channel/:userName/",
                element: (
                  <AuthLayout>
                    <ChannelVideos />
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
              {
                path: "/channel/:userName/blogs",
                element: (
                  <AuthLayout authentication={true}>
                    <ChannelBlog />
                  </AuthLayout>
                ),
              },
            ],
          },
          {
            path: "/playlist/feed/:userId",
            element: (
              <AuthLayout authentication={true}>
                <PlaylistFeed createPlaylistOption={true} />
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
          {
            path: "/history",
            element: (
              <AuthLayout authentication={true}>
                <WatchHistory />
              </AuthLayout>
            ),
          },
          {
            path: "/blog",
            element: (
              <AuthLayout authentication={true}>
                <Blog />
              </AuthLayout>
            ),
          },
          {
            path: "/setting",
            element: (
              <AuthLayout>
                <Setting/>
              </AuthLayout>
            )
          }
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
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <AuthLayout authentication={true}>
                <DashboardVideos />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/blogs",
            element: (
              <AuthLayout authentication={true}>
                <ChannelBlog/>
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/playlists",
            element:( 
              <AuthLayout authentication={true}>
                <DashboardPlaylist />
              </AuthLayout>
            ),
          }
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </Provider>
  //</React.StrictMode>
);
