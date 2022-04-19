import { useEffect } from 'react';
import { websocketEvents } from './events';

export function useAppWebsocket({ ready }: { ready: boolean }) {
  useEffect(() => {
    if (!ready) return;
    const ws = new WebSocket(import.meta.env.VITE_WS_URL as string);

    ws.onopen = () => {
      const initPayload = {
        event: 'online',
        data: { token: localStorage.getItem('token'), role: 'teacher' },
      };
      ws.send(JSON.stringify(initPayload));
    };

    ws.onmessage = ({ data: originData }) => {
      const { event, data } = JSON.parse(originData) as {
        event: keyof typeof websocketEvents;
        data: any;
      };
      websocketEvents[event](data);
    };
    return () => ws.close();
  }, [ready]);
}
