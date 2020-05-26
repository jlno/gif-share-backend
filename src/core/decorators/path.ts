import { Express } from '../express';

export function _path(value: string): Function {
  return (ref: Function) => {
    let pathList: any[] = Express.getPathList(ref.prototype);

    if (pathList) {
      pathList = pathList.reverse();

      while (pathList.length > 0) {
        const item = pathList.shift();
        item.attach(() => ref.prototype, value + item.path);
      }
      Express.setPathList(ref.prototype, []);
    }
  };
}
