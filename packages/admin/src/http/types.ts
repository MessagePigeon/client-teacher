export type LoginRequest = { password: string };
export type LoginResponse = { token: string };

export type PaginationRequest = { skip: number; take: number };
type PaginationResponse<T> = {
  data: T[];
  total: number;
};

export type MessagesRequest = PaginationRequest & {
  teacherId?: string;
  studentId?: string;
  startTime?: string;
  endTime?: string;
};
type Message = {
  id: number;
  createdAt: string;
  message: string;
  teacher: { id: string; name: string };
  students: Array<{ id: string; defaultRemark: string }>;
};
export type MessagesResponse = PaginationResponse<Message>;
