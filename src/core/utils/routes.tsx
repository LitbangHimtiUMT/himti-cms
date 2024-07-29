import AcaraView from "@features/admin/acara/view/Acara";
import { AnggotaView } from "@features/admin/anggota/view/Anggotas";
import { UserView } from "@features/admin/users/view/Users";
import AdminView from "@features/admin/view/Admin";
import LoginView from "@features/auth/view/LoginView";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
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
      {
        path: "/admin/user",
        element: <UserView />,
      },
      {
        path: "/admin/anggota",
        element: <AnggotaView />,
      },
    ],
  },
]);
