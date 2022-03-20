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
import { useRecoilValue } from 'recoil';
import { connectedStudentsState, pendingStudentsState } from '~/state/students';
import DeleteDialog from './dialog/DeleteDialog';
import EditDialog from './dialog/EditDialog';

const StudentsTable: React.FC = () => {
  const pendingStudents = useRecoilValue(pendingStudentsState);
  const connectedStudents = useRecoilValue(connectedStudentsState);

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
              <TableCell sx={{ fontWeight: 'bold' }}>备注</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                状态
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingStudents.map((student) => (
              <TableRow key={student.requestId}>
                <TableCell>{student.remark}</TableCell>
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  等待中
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
                  sx={{
                    color: (theme) =>
                      student.online
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {student.online ? '在线' : '离线'}
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
