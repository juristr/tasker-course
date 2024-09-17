'use client';

import { PowerIcon } from '@heroicons/react/24/outline';

export function AuthLink() {
  const handleLogout = async () => {
    await fetch(`/api/auth`, {
      method: 'DELETE',
    });
    window.location.assign('/login');
  };
  return (
    <>
      <PowerIcon className="mr-2 h-5 w-5 text-gray-600" />
      <button data-testid="logout" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
