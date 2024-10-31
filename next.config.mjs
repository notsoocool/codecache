/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ADMIN_USER_IDS: process.env.ADMIN_USER_IDS,
	},
	webpack:(config , context) =>{
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		  }
		return config
	} 
};

export default nextConfig;
