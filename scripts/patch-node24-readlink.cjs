/**
 * Workaround for a Node.js 24 regression on Windows where `fs.readlink` on a
 * regular (non-symlink) file throws `EISDIR` instead of the expected `EINVAL`.
 * Next.js's dependency tracer (@vercel/nft) only handles `EINVAL`, so the
 * production build crashes during "Collecting page data".
 *
 * This shim normalises `EISDIR` -> `EINVAL` for readlink calls. It is a no-op
 * on platforms/Node versions that behave correctly (Linux, Node 22, Vercel),
 * so it is safe to always preload via `node -r`.
 */
const fs = require("fs");

const isReadlinkEISDIR = (e) =>
  e && e.code === "EISDIR" && e.syscall === "readlink";

const toEINVAL = (path) => {
  const err = new Error(`EINVAL: invalid argument, readlink '${path}'`);
  err.code = "EINVAL";
  err.errno = -4071;
  err.syscall = "readlink";
  err.path = path;
  return err;
};

const { readlinkSync, readlink } = fs;

fs.readlinkSync = function (path, options) {
  try {
    return readlinkSync(path, options);
  } catch (e) {
    if (isReadlinkEISDIR(e)) throw toEINVAL(path);
    throw e;
  }
};

fs.readlink = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opts = typeof options === "function" ? undefined : options;
  return readlink(path, opts, (e, result) => {
    if (isReadlinkEISDIR(e)) return cb(toEINVAL(path));
    cb(e, result);
  });
};

if (fs.promises && fs.promises.readlink) {
  const promised = fs.promises.readlink.bind(fs.promises);
  fs.promises.readlink = async function (path, options) {
    try {
      return await promised(path, options);
    } catch (e) {
      if (isReadlinkEISDIR(e)) throw toEINVAL(path);
      throw e;
    }
  };
}
