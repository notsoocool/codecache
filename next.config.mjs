/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ADMIN_USER_IDS: process.env.ADMIN_USER_IDS,
	},
};

export default nextConfig;
