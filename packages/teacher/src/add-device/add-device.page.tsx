import React from 'react';
import StudentsTable from './components/students-table.component';
import ConnectForm from './components/connect-form.component';

const AddDevicePage: React.FC = () => {
  return (
    <>
      <ConnectForm />
      <StudentsTable />
    </>
  );
};

export default AddDevicePage;
