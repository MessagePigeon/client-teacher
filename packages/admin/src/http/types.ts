export type LoginRequest = { password: string };
export type LoginResponse = { token: string };

export type PaginationRequest = { skip: number; take: number };
type PaginationResponse<E> = {
  data: E[];
  total: number;
};

export type MessagesRequest = PaginationRequest & {
  teacherId?: string;
  studentId?: string;
  startTime?: string;
  endTime?: string;
  message?: string;
};
export type Message = {
  id: number;
  createdAt: string;
  message: string;
  teacher: { id: string; name: string };
  students: Array<{ id: string; defaultRemark: string }>;
};
export type MessagesResponse = PaginationResponse<Message>;

export type RegisterCode = { id: number; code: string };
export type FindRegisterCodesResponse = PaginationResponse<RegisterCode>;
export type GenerateRegisterCodesRequest = { count: number };
export type DeleteRegisterCodeRequest = { id: string };

export type ModifyConnectionRequest = { studentId: string; teacherId: string };

export type Teacher = {
  id: string;
  username: string;
  name: string;
  online: boolean;
  students: Array<{ id: string; defaultRemark: string }>;
};
export type FindTeachersRequest = PaginationRequest & {
  id?: string;
  username?: string;
  name?: string;
};
export type FindTeachersResponse = PaginationResponse<Teacher>;
export type CreateTeacherRequest = { username: string; name: string };
export type CreateTeacherResponse = { password: string };
export type DeleteTeacherRequest = { id: string };
export type ModifyTeacherNameRequest = { id: string; newName: string };
export type ResetTeacherPasswordRequest = { id: string };
export type ResetTeacherPasswordResponse = {
  username: string;
  newPassword: string;
};

export type Student = {
  id: string;
  defaultRemark: string;
  key: string;
  online: boolean;
  teachers: Array<{ id: string; name: string }>;
};
export type FindStudentsRequest = PaginationRequest & {
  id?: string;
  defaultRemark?: string;
};
export type FindStudentsResponse = PaginationResponse<Student>;
export type CreateStudentRequest = { defaultRemark: string; key?: string };
export type CreateStudentResponse = { defaultRemark: string; key: string };
export type DeleteStudentRequest = { id: string };
export type ModifyStudentRequest = {
  id: string;
  key?: string;
  defaultRemark?: string;
};
