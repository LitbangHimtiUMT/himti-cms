import AdminNavbar from '@features/admin/components/AdminNavbar'
import { EventMeetingContent } from '../components/EventMeetingContent';

export const EventMeetingView = () => {
  return (
    <>
      <AdminNavbar layout='Event Meeting' page='List Event Meeting' link='/admin/event-meeting' showBackButton={false} />
      <div className='mt-12 mb-8 flex flex-col gap-12 flex-1'>
        <EventMeetingContent/>
      </div>
    </>
  );
}
