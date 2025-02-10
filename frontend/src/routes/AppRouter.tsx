import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/layouts/App";
import {
  AddStudent,
  GetStudents,
  Home,
  Login,
  Register,
  UpdateStudent,
} from "@/pages";
import { ProtectedRoute } from "@/components/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/students",
        element: (
          <ProtectedRoute>
            <GetStudents />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/add",
        element: (
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/edit/:id",
        element: (
          <ProtectedRoute>
            <UpdateStudent />
          </ProtectedRoute>
        ),
        loader: ({ params }) => {
          if (!/^[0-9]$/i.test(params.id!)) {
            throw new Response("Bad Request", {
              statusText: `Student with id ${params.id} not found!`,
              status: 400,
            });
          }
          return true;
        },
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
