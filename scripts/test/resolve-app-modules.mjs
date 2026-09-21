// Node ESM loader hooks used only by `pnpm test` (see scripts/test/register.mjs).
// Next.js's bundler resolves these specifiers when the app runs for real;
// plain `node --test` needs this to run route/module tests without a bundler.
import { pathToFileURL } from 'node:url'

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const target = new URL(
      `src/${specifier.slice(2)}.ts`,
      pathToFileURL(`${process.cwd()}/`)
    )
    return nextResolve(target.href, context)
  }
  if (specifier === 'next/server') {
    return nextResolve('next/server.js', context)
  }
  return nextResolve(specifier, context)
}
