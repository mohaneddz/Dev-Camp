import { Object3DNode } from '@react-three/fiber';
import { Group, AmbientLight, DirectionalLight, PointLight } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<Group, typeof Group>;
      ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
      directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>;
      pointLight: Object3DNode<PointLight, typeof PointLight>;
    }
  }
} 