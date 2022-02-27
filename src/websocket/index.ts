import { useEffect } from 'react';
import useWsServices from './services';

export default function useAllWsEvents({ ready }: { ready: boolean }) {
  const service = useWsServices();

  useEffect(() => {
    if (!ready) return;
    const ws = new WebSocket(import.meta.env.VITE_WS_API as string);

    ws.onopen = () => {
      const initPayload = {
        event: 'online',
        data: { token: localStorage.getItem('token'), role: 'teacher' },
      };
      ws.send(JSON.stringify(initPayload));
    };

    ws.onmessage = ({ data: originData }) => {
      const run = {
        'reject-connect-request': service.rejectConnectRequest,
        'accept-connect-request': service.acceptConnectRequest,
      };
      const { event, data } = JSON.parse(originData) as {
        event: keyof typeof run;
        data: any;
      };
      run[event](data);
    };
  }, [ready]);
}
