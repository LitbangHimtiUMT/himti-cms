import AdminNavbar from '@features/admin/components/AdminNavbar';
import { EventRegistrationContent } from '../components/EventRegistrationContent';

export const EventRegistrationView = () => {
  return (
    <>
      <AdminNavbar
        layout='Event Registration'
        page='List Event Registration'
        link='/admin/event-registration'
        showBackButton={false}
      />
      <div className='mt-12 mb-8 flex flex-col gap-12 flex-1'>
        <EventRegistrationContent />
      </div>
    </>
  );
};
