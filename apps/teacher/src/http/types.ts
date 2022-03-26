export type LoginRequest = { username: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequest = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

export type InitResponse = { username: string; name: string };

export type StudentResponse = Array<{
  id: string;
  online: boolean;
  remark: string;
}>;

export type ConnectRequest = { connectCode: string; remark: string };

export type ConnectRequestResponse = {
  requestId: string;
  studentId: string;
  remark: string;
};

export type ModifyStudentRemarkRequest = {
  studentId: string;
  newRemark: string;
};

export type ModifyNameRequest = { newName: string };

export type ModifyPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type SendMessageRequest = {
  studentIds: string[];
  message: string;
  tts: number;
  closeDelay: number;
};

export type SendMessageResponse = {
  messageId: number;
  createdAt: string;
  message: string;
  studentIds: string[];
};

export type PaginationRequest = { skip: number; take: number };

type PaginationResponse<T> = {
  data: T[];
  total: number;
};

type Message = {
  id: number;
  createdAt: string;
  message: string;
  studentIds: string[];
  showingIds: string[];
};

export type MessagesResponse = PaginationResponse<Message>;
