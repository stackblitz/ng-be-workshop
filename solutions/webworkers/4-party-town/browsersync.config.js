module.exports = {
  files: ['./src/**/*.{html,js,mjs}'],
  server: {
    baseDir: './src',
  },
  middleware: [
    function (_req, res, next) {
      // these headers are required to put the page in cross-origin isolation mode
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

      next();
    },
  ],
};
