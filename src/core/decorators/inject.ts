export function _inject(target: Object, propertyName: string) {
  const propertyDescriptor: PropertyDescriptor =
    Object.getOwnPropertyDescriptor(target, propertyName) || {};
  const Ref = Reflect.getMetadata('design:type', target, propertyName);
  propertyDescriptor.value = new Ref();
  Object.defineProperty(target, propertyName, propertyDescriptor);
}
