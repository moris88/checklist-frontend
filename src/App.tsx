import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import ListProjects from './components/ListProjects';
import Wrapper from "./components/Wrapper";

let router = createBrowserRouter([
  {
    path: "/projects",
    Component() {
      
      return <Wrapper title="Projects"><ListProjects /></Wrapper>
    },
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App
