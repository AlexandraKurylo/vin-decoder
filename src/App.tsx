import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { VariablePage } from "./pages/VariablePage";
import { VariablesPage } from "./pages/VariablesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "variables",
        element: <VariablesPage />,
      },
      {
        path: "variables/:variableId",
        element: <VariablePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
