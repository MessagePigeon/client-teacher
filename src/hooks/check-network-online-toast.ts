import { useNetwork } from 'ahooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function useCheckNetworkOnlineToast() {
  const { online } = useNetwork();

  useEffect(() => {
    if (online) {
      toast.dismiss('offline-warning');
    } else {
      toast.warn('Network Error', {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        toastId: 'offline-warning',
      });
    }
  }, [online]);
}
