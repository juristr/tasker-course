import Link from 'next/link';
import {
  FolderIcon,
  HomeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { AuthLink } from './auth-link';

export function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col">
      <Link
        className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900"
        href="/"
      >
        <Squares2X2Icon className="h-6 w-6 text-indigo-600" />
        <span>Tasker</span>
      </Link>
      <nav className="flex-1">
        <Link
          className="flex items-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          data-testid="nav-link-dashboard"
          href="/"
        >
          <HomeIcon className="h-5 w-5 text-gray-600" />
          Dashboard
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          data-testid="nav-link-tasks"
          href="/tasks"
        >
          <ListBulletIcon className="h-5 w-5 text-gray-600" />
          Tasks
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          data-testid="nav-link-projects"
          href="/projects"
        >
          <FolderIcon className="h-5 w-5 text-gray-600" />
          Projects
        </Link>
        {/*<Link*/}
        {/*  className="flex items-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"*/}
        {/*  href="#"*/}
        {/*>*/}
        {/*  <UsersIcon className="h-5 w-5 text-gray-600" />*/}
        {/*  Team*/}
        {/*</Link>*/}
      </nav>
      <div className="flex items-center self-center text-center">
        <AuthLink />
      </div>
    </div>
  );
}
