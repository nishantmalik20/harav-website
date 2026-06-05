/**
 * Build entry point.
 *
 * Runs `next build --turbopack` with the Node 24 readlink shim preloaded in
 * both this process and every child process Next spawns (via NODE_OPTIONS).
 * On healthy environments (Vercel, Linux, Node 22) the shim is a no-op, so
 * this wrapper is safe everywhere and keeps `npm run build` working as-is.
 */
const { spawnSync } = require("child_process");
const path = require("path");

// Preload the shim in this process.
require(path.join(__dirname, "patch-node24-readlink.cjs"));

// Propagate to child processes. NODE_OPTIONS splits on spaces, so we use a
// relative (space-free) path that resolves from the project root cwd.
const requireFlag = "--require ./scripts/patch-node24-readlink.cjs";
const env = {
  ...process.env,
  NODE_OPTIONS: process.env.NODE_OPTIONS
    ? `${process.env.NODE_OPTIONS} ${requireFlag}`
    : requireFlag,
};

const nextBin = path.join("node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build", "--turbopack"], {
  stdio: "inherit",
  env,
});

process.exit(result.status ?? 1);
