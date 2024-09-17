'use client';

import { JSX, FormEvent, useState } from 'react';
import { useToast } from '@tasker/ui/toast';
import { useRouter } from 'next/navigation';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface EmailAndPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const [failed, setFailed] = useState(false);
  const handleSubmit = async (evt: FormEvent<EmailAndPasswordFormElement>) => {
    evt.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: evt.currentTarget.elements.email.value,
          password: evt.currentTarget.elements.password.value,
        }),
      });
      if (res.status >= 400) {
        setFailed(true);
      } else {
        toast.success('Successfully signed in');
        router.replace('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setFailed(true);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500">
            Enter your email and password to sign in.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block font-medium" htmlFor="email">
              Email
            </label>
            <input
              autoFocus
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              data-testid="email"
              id="email"
              placeholder="user@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-medium" htmlFor="password">
                Password
              </label>
            </div>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              data-testid="password"
              id="password"
              required
              type="password"
            />
          </div>
          {failed ? (
            <div
              className="text-sm font-medium text-red-500"
              data-testid="error"
            >
              Incorrect email or password. Please try again.
            </div>
          ) : null}
          <button
            data-testid="submit"
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
