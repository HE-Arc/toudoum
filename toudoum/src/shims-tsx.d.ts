import Vue, { VNode } from 'vue'
import {clipperFixed} from ('vuejs-clipper');

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  const clipperFixed: typeof _clipperFixed;
}
