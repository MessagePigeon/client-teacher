import React from 'react';
import StudentsTable from './components/StudentsTable';
import ConnectForm from './components/ConnectForm';

const AddDevice: React.FC = () => {
  return (
    <>
      <ConnectForm />
      <StudentsTable />
    </>
  );
};

export default AddDevice;
