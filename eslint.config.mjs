import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next 16 ships native flat configs, so they are spread in
 * directly rather than going through the eslintrc compatibility shim.
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**'] },
  ...coreWebVitals,
  ...typescript,
]

export default config
