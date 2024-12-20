import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      rules: {
        '*.cdc': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig;
