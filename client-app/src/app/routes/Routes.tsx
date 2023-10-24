import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../pages/home/Home";
import Details from "../pages/Details";
import MyShows from "../pages/MyShows";
import MyShowDetails from "../pages/MyShowDetails";

export const routes: RouteObject[] = [
    { 
        path: '/', 
        element: <App />, 
        children: [
            { path: '', element: <Home /> },
            { path: 'details/:id', element: <Details /> },
            { path: 'my-shows', element: <MyShows /> },
            { path: 'my-show-details/:id', element: <MyShowDetails /> },
        ] 
    }
]

export const router = createBrowserRouter(routes);