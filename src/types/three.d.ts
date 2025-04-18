/// <reference types="@react-three/fiber" />
import { Group } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
    }
  }
} 