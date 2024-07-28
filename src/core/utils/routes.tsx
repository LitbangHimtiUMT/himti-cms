import AcaraView from "@features/admin/acara/view/acara";
import AdminView from "@features/admin/view/Admin";
import LoginView from "@features/auth/view/LoginView";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginView />,
  },
  {
    path: "/",
    element: <AdminView />,
    children: [
      {
        path: "/admin/acara",
        element: <AcaraView />,
      },
    ],
  },
]);
