import AdminNavbar from '@features/admin/components/AdminNavbar';
import { RegistrationTypeContent } from '../components/RegistrationTypeContent';

export const RegistrationTypeView = () => {
  return (
    <>
      <AdminNavbar
        layout='Registration Type'
        showBackButton={false}
      />
      <div className='mt-12 mb-8 flex flex-col gap-12 flex-1'>
        <RegistrationTypeContent />
      </div>
    </>
  );
};
