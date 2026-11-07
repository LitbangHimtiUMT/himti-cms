import AcaraView from "@features/admin/acara/view/acara";
import AddAcaraView from "@features/admin/acara/view/addAcara";
import DetailAcaraView from "@features/admin/acara/view/detailAcara";
import EditAcaraView from "@features/admin/acara/view/editAcara";
import AddSubAcaraView from "@features/admin/acara/components/SubAcara/view/addSubAcara";
import DetailSubAcaraView from "@features/admin/acara/components/SubAcara/view/detailSubAcara";
import EditSubAcaraView from "@features/admin/acara/components/SubAcara/view/editSubAcara";
import AddAnggotaView from "@features/admin/anggota/view/addAnggota";
import { AnggotaView } from "@features/admin/anggota/view/Anggotas";
import EditAnggotaView from "@features/admin/anggota/view/editAnggota";
import { AngkatanView } from "@features/admin/angkatan/view/Angkatan";
import { CreateAngkatanView } from "@features/admin/angkatan/view/CreateAngkatan";
import { UpdateAngkatanView } from "@features/admin/angkatan/view/UpdateAngkatan";
import AddDosenView from "@features/admin/dosen/view/addDosen";
import { DosenView } from "@features/admin/dosen/view/Dosen";
import EditDosenView from "@features/admin/dosen/view/editDosen";
import AddStrukturalView from "@features/admin/struktural/view/addStruktural";
import EditStrukturalView from "@features/admin/struktural/view/editStruktural";
import StrukturalView from "@features/admin/struktural/view/struktural";
import { UserLoginView } from "@features/admin/user-login/views/UserLogin";
import { CreateUserView } from "@features/admin/users/view/CreateUser";
import { UpdateUserView } from "@features/admin/users/view/UpdateUser";
import { UserView } from "@features/admin/users/view/users";
import AdminView from "@features/admin/view/Admin";
import { AttendanceViews } from "@features/attendances/views/AttendanceViews";
import LoginView from "@features/auth/view/LoginView";
import { CreateEventMeetingViews } from "@features/event-meeting/views/CreateEventMeetingViews";
import { CreateMeetingViews } from "@features/event-meeting/views/CreateMeetingViews";
import { EventMeetingView } from "@features/event-meeting/views/EventMeeting";
import { EventMeetingDetail } from "@features/event-meeting/views/EventMeetingDetail";
import { UpdateEventMeetingViews } from "@features/event-meeting/views/UpdateEventMeetingViews";
import { UpdateMeetingViews } from "@features/event-meeting/views/UpdateMeetingViews";
import { RegistrationTypeView } from "@features/registration-type/views/RegistrationType";
import { RegistrationTypeDetailView } from "@features/registration-type/views/RegistrationTypeDetail";
import { CreateRegistrationTypeView } from "@features/registration-type/views/CreateRegistrationType";
import { UpdateRegistrationTypeView } from "@features/registration-type/views/UpdateRegistrationType";
import { VersionView } from "@features/version/view/version";
import { createBrowserRouter } from "react-router-dom";
import { Playground } from "../../features/_global/views/playground";
import { HistoriesViews } from "../../features/histories/views/HistoriesViews";
import { CategoriesViews } from "../../features/lms/categories/views/Categories";
import { ClassViews } from "../../features/lms/class/views/ClassViews";
import { DetailMentorsViews } from "../../features/lms/mentors/views/DetailMentors";
import { MentorsViews } from "../../features/lms/mentors/views/Mentors";

// New CRUD CMS Imports
import PotentialUserKeysView from "@features/admin/potential-user-keys/view/potentialUserKeys";
import AddPotentialUserKeyView from "@features/admin/potential-user-keys/view/addPotentialUserKey";
import ProdiStructuralView from "@features/admin/prodi-structural/view/prodiStructural";
import AddProdiStructuralView from "@features/admin/prodi-structural/view/addProdiStructural";
import EditProdiStructuralView from "@features/admin/prodi-structural/view/editProdiStructural";
import PeriodeView from "@features/admin/periode/view/periode";
import AddPeriodeView from "@features/admin/periode/view/addPeriode";
import EditPeriodeView from "@features/admin/periode/view/editPeriode";
import ContactInfoView from "@features/admin/contact-info/view/contactInfo";
import AddContactInfoView from "@features/admin/contact-info/view/addContactInfo";
import EditContactInfoView from "@features/admin/contact-info/view/editContactInfo";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <LoginView />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "/",
    element: <AdminView />,
    children: [
      {
        path: "/",
        element: <HistoriesViews />,
      },
      {
        path: "/histories",
        element: <HistoriesViews />,
      },
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
        path: "/admin/acara/edit/:id",
        element: <EditAcaraView />,
      },
      {
        path: "/admin/acara/:acaraId/sub-acara/create",
        element: <AddSubAcaraView />,
      },
      {
        path: "/admin/acara/:acaraId/sub-acara/update/:id",
        element: <EditSubAcaraView />,
      },
      {
        path: "/admin/acara/:acaraId/sub-acara/:id",
        element: <DetailSubAcaraView />,
      },
      {
        path: "/admin/user",
        element: <UserView />,
      },
      {
        path: "/admin/user/create",
        element: <CreateUserView />,
      },
      {
        path: "/admin/user/update/:id",
        element: <UpdateUserView />,
      },
      {
        path: "/admin/anggota",
        element: <AnggotaView />,
      },
      {
        path: "/admin/anggota/create",
        element: <AddAnggotaView />,
      },
      {
        path: "/admin/anggota/edit/:id",
        element: <EditAnggotaView />,
      },
      {
        path: "/admin/dosen",
        element: <DosenView />,
      },
      {
        path: "/admin/dosen/create",
        element: <AddDosenView />,
      },
      {
        path: "/admin/dosen/edit/:id",
        element: <EditDosenView />,
      },
      {
        path: "/admin/struktural",
        element: <StrukturalView />,
      },
      {
        path: "/admin/struktural/create",
        element: <AddStrukturalView />,
      },
      {
        path: "/admin/struktural/edit/:id",
        element: <EditStrukturalView />,
      },
      {
        path: "/admin/angkatan",
        element: <AngkatanView />,
      },
      {
        path: "/admin/angkatan/create",
        element: <CreateAngkatanView />,
      },
      {
        path: "/admin/angkatan/update/:id",
        element: <UpdateAngkatanView />,
      },
      {
        path: "/admin/user-login",
        element: <UserLoginView />,
      },
      {
        path: "/admin/event-meeting",
        element: <EventMeetingView />,
      },
      {
        path: "/admin/event-meeting/create",
        element: <CreateEventMeetingViews />,
      },
      {
        path: "/admin/event-meeting/update/:eventMeetingId",
        element: <UpdateEventMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId",
        element: <EventMeetingDetail />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/meeting/create",
        element: <CreateMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/meeting/update/:meetingId",
        element: <UpdateMeetingViews />,
      },
      {
        path: "/admin/event-meeting/:eventMeetingId/:meetingId",
        element: <AttendanceViews />,
      },
      {
        path: "/admin/registration-type",
        element: <RegistrationTypeView />,
      },
      {
        path: "/admin/registration-type/create",
        element: <CreateRegistrationTypeView />,
      },
      {
        path: "/admin/registration-type/update/:registrationTypeId",
        element: <UpdateRegistrationTypeView />,
      },
      {
        path: "/admin/registration-type/:registrationTypeId",
        element: <RegistrationTypeDetailView />,
      },
      {
        path: "/lms/categories",
        element: <CategoriesViews />,
      },
      {
        path: "/lms/mentors",
        element: <MentorsViews />,
      },
      {
        path: "/lms/class",
        element: <ClassViews />,
      },
      {
        path: "/lms/mentors/:mentorId",
        element: <DetailMentorsViews />,
      },
      {
        path: "/admin/version",
        element: <VersionView />,
      },
      // Potential User Keys Routes
      {
        path: "/admin/potential-user-keys",
        element: <PotentialUserKeysView />,
      },
      {
        path: "/admin/potential-user-keys/create",
        element: <AddPotentialUserKeyView />,
      },
      // Prodi Structural Routes
      {
        path: "/admin/prodi-structural",
        element: <ProdiStructuralView />,
      },
      {
        path: "/admin/prodi-structural/create",
        element: <AddProdiStructuralView />,
      },
      {
        path: "/admin/prodi-structural/edit/:id",
        element: <EditProdiStructuralView />,
      },
      // Tenure Period Routes
      {
        path: "/admin/periode",
        element: <PeriodeView />,
      },
      {
        path: "/admin/periode/create",
        element: <AddPeriodeView />,
      },
      {
        path: "/admin/periode/edit/:id",
        element: <EditPeriodeView />,
      },
      // Contact Info Routes
      {
        path: "/admin/contact-info",
        element: <ContactInfoView />,
      },
      {
        path: "/admin/contact-info/create",
        element: <AddContactInfoView />,
      },
      {
        path: "/admin/contact-info/edit/:id",
        element: <EditContactInfoView />,
      },
    ],
  },
]);
