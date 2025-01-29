import { PageLayout } from "../../../_global/components/PageLayout";
import AdminNavbar from "../../../admin/components/AdminNavbar";

export const DetailMentorsViews = () => {
  return <div>
    <AdminNavbar
        layout="Detail Mentor"
        page="Detail Mentor"
        link="/lms/mentors"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
        title="Detail Mentor"
        >
            
        </PageLayout>
      </div>
  </div>;
};
