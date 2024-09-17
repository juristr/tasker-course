/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [{ source: '/', destination: '/dashboard', permanent: false }];
  },
  transpilePackages: ['@tasker/ui', '@tasker/dashboard-widgets'],
};
