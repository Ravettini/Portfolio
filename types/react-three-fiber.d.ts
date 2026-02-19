/* Ensures R3F JSX intrinsic elements (mesh, planeGeometry, etc.) are available */
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
