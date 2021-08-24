module.exports = {
  reactStrictMode: true,
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
