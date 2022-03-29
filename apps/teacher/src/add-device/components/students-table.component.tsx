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
  Tooltip,
} from '@mui/material';
import { useBoolean } from 'ahooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '~/state/hooks';
import { connectedStudentsSelector } from '~/state/slices/connected-students.slice';
import { pendingStudentsSelector } from '~/state/slices/pending-students.slice';
import DeleteDialog from './dialog/delete-dialog.component';
import EditDialog from './dialog/edit-dialog.component';

const StudentsTable: React.FC = () => {
  const { t } = useTranslation();

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
              <TableCell sx={{ fontWeight: 'bold' }}>
                {t('add-device.table.head.remark')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                {t('add-device.table.head.status')}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                {t('add-device.table.head.actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingStudents.map((student) => (
              <TableRow key={student.requestId}>
                <TableCell>{student.remark}</TableCell>
                <TableCell align="center" sx={{ color: 'text.secondary' }}>
                  {t('add-device.table.status.pending')}
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
                  {student.online
                    ? t('add-device.table.status.online')
                    : t('add-device.table.status.offline')}
                </TableCell>
                <TableCell align="right">
                  <Tooltip
                    title={t('add-device.table.tooltip.edit')!}
                    arrow
                    placement="left"
                  >
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
                  </Tooltip>
                  <Tooltip
                    title={t('add-device.table.tooltip.delete')!}
                    arrow
                    placement="right"
                  >
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
                  </Tooltip>
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
