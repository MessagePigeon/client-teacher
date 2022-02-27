import { useRecoilState } from 'recoil';
import useRecoilValueInCustomHook from '~/hooks/use-recoil-value-in-custom-hook';
import { connectedStudentsState, pendingStudentsState } from '~/state/students';
import getDeleteArrayByIndex from '~/utils/get-delete-array-by-index';

type ResponseConnectRequestData = { requestId: string };

export default function useWsServices() {
  const [_connectedStudents, setConnectedStudents] = useRecoilState(
    connectedStudentsState,
  );
  const [_pendingStudents, setPendingStudents] =
    useRecoilState(pendingStudentsState);
  const connectedStudents = useRecoilValueInCustomHook(_connectedStudents);
  const pendingStudents = useRecoilValueInCustomHook(_pendingStudents);

  const rejectConnectRequest = ({ requestId }: ResponseConnectRequestData) => {
    const index = pendingStudents.findIndex(
      ({ requestId: originRequestId }) => originRequestId === requestId,
    );
    setPendingStudents(getDeleteArrayByIndex(pendingStudents, index));
  };

  const acceptConnectRequest = ({ requestId }: ResponseConnectRequestData) => {
    console.log({ requestId, pendingStudents });
    const newConnectedStudent = pendingStudents.find(
      ({ requestId: originRequestId }) => originRequestId === requestId,
    )!;
    console.log({ newConnectedStudent });
    setConnectedStudents([
      {
        id: newConnectedStudent.studentId,
        remark: newConnectedStudent.remark,
        online: true,
      },
      ...connectedStudents,
    ]);

    const index = pendingStudents.findIndex(
      ({ requestId: originRequestId }) => originRequestId === requestId,
    );
    setPendingStudents(getDeleteArrayByIndex(pendingStudents, index));
  };

  return { rejectConnectRequest, acceptConnectRequest };
}
