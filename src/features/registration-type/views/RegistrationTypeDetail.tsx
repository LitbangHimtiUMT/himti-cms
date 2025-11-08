import AdminNavbar from '@features/admin/components/AdminNavbar';
import { RegistrationTypeDetailContent } from '../components/RegistrationTypeDetailContent';

export const RegistrationTypeDetailView = () => {
  return (
    <>
      <AdminNavbar
        layout='Registration Type'
        page='Detail Registration Type'
        link='/admin/registration-type'
        showBackButton={true}
      />
      <div className='mt-12 mb-8 flex flex-col gap-12 flex-1'>
        <RegistrationTypeDetailContent />
      </div>
    </>
  );
};
