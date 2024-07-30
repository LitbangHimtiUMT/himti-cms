import AcaraView from "@features/admin/acara/view/acara";
import AddAcaraView from "@features/admin/acara/view/addAcara";
import DetailAcaraView from "@features/admin/acara/view/detailAcara";
import { AnggotaView } from "@features/admin/anggota/view/Anggotas";
import { UserView } from "@features/admin/users/view/users";
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
        path: "/admin/acara/create",
        element: <AddAcaraView />,
      },
      {
        path: "/admin/acara/:id",
        element: <DetailAcaraView />,
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
