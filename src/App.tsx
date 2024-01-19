import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  if (process.env.NODE_ENV === "production") console.log = () => {};
  return <RouterProvider router={routes()} />;
}

export default App;
