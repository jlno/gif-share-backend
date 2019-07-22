import { Express } from '../express';

export function _path(value: string): Function {
  return (ref: Function) => {
    const pathList: any[] = Express.getPathList(ref.prototype);

    if (pathList) {
      pathList.forEach(item => {
        item.attach(() => ref.prototype, value + item.path);
      });
    }
  };
}
