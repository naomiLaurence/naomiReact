import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Cards from "./Cards";
import Register from "./Register";
import Error from "./Error";
import Root from "../layouts/Root";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "./Profile";
import UpdateCard from "./UpdateCard";
import CreateCard from "./CreatCard";
import MyCards from "./MyCards";
import FavoriteCards from "./FavoriteCards";
import About from "../components/About/About";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Cards /> },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: "/cards", element: <Cards /> },
            { path: "/createCard", element: <CreateCard /> },
            { path: "/favoriteCard", element: <FavoriteCards /> },
            { path: "/my-cards", element: <MyCards /> },
            { path: "/about", element: <About /> },
            {
                path: "/update/:id",
                element: <UpdateCard />,
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/my-cards",
                element:
                    <ProtectedRoute>
                        <MyCards />
                    </ProtectedRoute>,
            },
        ],
    },
])