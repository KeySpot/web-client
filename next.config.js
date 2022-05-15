module.exports = {
  reactStrictMode: true,
  // target: "serverless",
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/cli-tool',
        permanent: true,
      },
    ]
  },
}
