import React, { createContext, useState } from 'react';

type LockedIdsContextType = {
  lockedIds: { student: string; teacher: string };
  setLockedTeacherId: (id: string) => void;
  setLockedStudentId: (id: string) => void;
};

export const LockedIdsContext = createContext<LockedIdsContextType>({
  lockedIds: { student: '', teacher: '' },
  setLockedTeacherId() {
    return;
  },
  setLockedStudentId() {
    return;
  },
});

export const LockedIdsProvider: React.FC = ({ children }) => {
  const [lockedIds, setLockedIds] = useState({ student: '', teacher: '' });
  const setLockedTeacherId = (id: string) =>
    setLockedIds((prevIds) => ({ ...prevIds, teacher: id }));
  const setLockedStudentId = (id: string) =>
    setLockedIds((prevIds) => ({ ...prevIds, student: id }));

  return (
    <LockedIdsContext.Provider
      value={{ lockedIds, setLockedTeacherId, setLockedStudentId }}
    >
      {children}
    </LockedIdsContext.Provider>
  );
};
