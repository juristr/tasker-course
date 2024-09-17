import type { ReactNode, JSX } from 'react';
import Link from 'next/link';

export function Card({
  children,
  href,
}: {
  className?: string;
  title: string;
  children: ReactNode;
  href: string;
}): JSX.Element {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <Link className="" href={href}>
        <div className="mb-2 text-gray-500">{children}</div>
      </Link>
    </div>
  );
}
