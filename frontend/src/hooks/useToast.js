import { useEffect } from 'react';
import { useMessage } from '../MessageContext';
import toast from 'react-hot-toast';

const useToast = () => {
  const [message, setMessage] = useMessage();

  useEffect(() => {
    try {
      if (message) {
        if (message.status === 'ok') {
          toast.remove(1);

          toast.success(message.text, {
            duration: 5000,
            id: 1,
          });
        } else {
          toast.remove(2);

          toast.error(message.text, {
            duration: 5000,
            id: 2,
          });
        }
      }
    } finally {
      setMessage(null);
    }
  }, [message, setMessage]);
};
export default useToast;
