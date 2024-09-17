'use client';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ToastData {
  visible: boolean;
  message?: string;
  type?: 'success' | 'error';
}

export const ToastContext = createContext<null | {
  error: (msg: string) => void;
  success: (msg: string) => void;
}>(null);

export const useToast = () =>
  useContext(ToastContext) as {
    error: (msg: string) => void;
    success: (msg: string) => void;
  };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ToastData>({ visible: false });
  const success = (message: string) =>
    setValue({ visible: true, message, type: 'success' });
  const error = (message: string) =>
    setValue({ visible: true, message, type: 'error' });
  useEffect(() => {
    if (value.visible) {
      setTimeout(() => setValue({ visible: false }), 2000);
    }
  }, [value]);
  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <Toast {...value} />
    </ToastContext.Provider>
  );
}

export function Toast(props: ToastData) {
  return props.visible ? (
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform"
      data-testid="toast"
    >
      {props.type === 'success' ? (
        <div className="flex items-center rounded-md bg-green-500 px-4 py-3 text-white shadow-lg">
          <CheckCircleIcon className="mr-2 h-5 w-5" />
          <span>{props.message}</span>
        </div>
      ) : (
        <div className="flex items-center rounded-md bg-red-500 px-4 py-3 text-white shadow-lg">
          <ExclamationCircleIcon className="mr-2 h-5 w-5" />
          <span>{props.message}</span>
        </div>
      )}
    </div>
  ) : null;
}
