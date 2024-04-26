import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
});


// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vitest/config'
// import tsconfigPaths from 'vite-tsconfig-paths'
//
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['./test/setup-test-env.ts'],
//     coverage: {
//       provider: 'c8',
//       all: true,
//       include: [
//         'app/**/*.{ts,tsx}'
//       ],
//       exclude: [
//         'app/**/*.test.{ts,tsx}',
//         'app/entry.client.tsx',
//         'app/entry.server.tsx',
//         'app/root.tsx',
//       ]
//     },
//
//   },
// })
