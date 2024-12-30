/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  images: {
    remotePatterns: [
			{
				protocol: "https",
				hostname: "19427440-test.s3-hcm5-r1.longvan.net",
				pathname: "**",
			},
		],
  },
  // ...
};
// const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */

// module.exports = withNextIntl(nextConfig);