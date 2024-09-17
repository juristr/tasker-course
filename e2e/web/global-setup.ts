import { execSync } from 'node:child_process';

export default async function globalSetup() {
  execSync(`pnpm --filter "@tasker/database" db:seed`);
}
