import { Config } from '../config';

beforeAll(() => {
  Config.setEnvironments();
});

describe('This is a simple test', () => {
  test('Check test environments', () => {
    expect(process.env.NODE_ENV).toEqual('test');
  });
});
