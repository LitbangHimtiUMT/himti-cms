import AdminNavbar from "@features/admin/components/AdminNavbar";
import { MeetingContent } from "../components/meetings/MeetingContent";

export const EventMeetingDetail = () => {

  return (
    <>
      <AdminNavbar layout='Meeting' page='List Meeting' />
      <div className='mt-12 mb-8 flex flex-col gap-12 flex-1'>
        <MeetingContent />
      </div>
    </>
  );
};
