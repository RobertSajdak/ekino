import nextMDX from '@next/mdx';

const withMDX = nextMDX({
	extension: /\.mdx$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				pathname: '/photos/**',
			},
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/**',
			},
		],
	},
	pageExtensions: ['mdx', 'ts', 'tsx'],
	experimental: {
		mdxRs: true,
	},
	async redirects() {
		return [
			{
				source: '/filmy-i-seriale',
				destination: '/szukaj',
				permanent: false,
			},
			{
				source: '/filmy-i-seriale/:type',
				destination: '/szukaj',
				permanent: false,
			},
			// przekierowanie całej ścieżki
			// {
			//     source: '/szukaj/:slug*',
			//     destination: '/',
			//     permanent: false
			// }
		];
	},
};

export default withMDX(nextConfig);
