import React from 'react';
import ConnectedStudentsTable from './components/ConnectedStudentsTable';
import ConnectForm from './components/ConnectForm';

const AddDevice: React.FC = () => {
  return (
    <>
      <ConnectForm />
      <ConnectedStudentsTable />
    </>
  );
};

export default AddDevice;
