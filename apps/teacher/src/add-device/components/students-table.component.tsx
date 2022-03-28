import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import React, { useState } from 'react';
import { useAppSelector } from '~/state/hooks';
import { connectedStudentsSelector } from '~/state/slices/connected-students.slice';
import { pendingStudentsSelector } from '~/state/slices/pending-students.slice';
import DeleteDialog from './dialog/delete-dialog.component';
import EditDialog from './dialog/edit-dialog.component';

const StudentsTable: React.FC = () => {
  const pendingStudents = useAppSelector(pendingStudentsSelector);
  const connectedStudents = useAppSelector(connectedStudentsSelector);

  const [openDeleteDialog, { set: setOpenDeleteDialog }] = useBoolean();
  const [openEditDialog, { set: setOpenEditDialog }] = useBoolean();
  const [selectStudentId, setSelectStudentId] = useState<string>('');
  const [selectStudentRemark, setSelectStudentRemark] = useState<string>('');

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Remark</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingStudents.map((student) => (
              <TableRow key={student.requestId}>
                <TableCell>{student.remark}</TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary' }}>
                  Pending
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" disabled>
                    <Edit fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" disabled>
                    <Delete fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {connectedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.remark}</TableCell>
                <TableCell
                  align="center"
                  sx={{ color: student.online ? 'success.main' : 'error.main' }}
                >
                  {student.online ? 'Online' : 'Offline'}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectStudentId(student.id);
                      setSelectStudentRemark(student.remark);
                      setOpenEditDialog(true);
                    }}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectStudentId(student.id);
                      setSelectStudentRemark(student.remark);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        studentId={selectStudentId}
        studentRemark={selectStudentRemark}
      />
      <EditDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        studentId={selectStudentId}
        oldStudentRemark={selectStudentRemark}
      />
    </>
  );
};

export default StudentsTable;
