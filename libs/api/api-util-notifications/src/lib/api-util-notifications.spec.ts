import { apiUtilNotifications } from './api-util-notifications';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

describe('apiUtilNotifications', () => {
  it('should work', () => {
    expect(apiUtilNotifications()).toEqual('api-util-notifications');
  });

  test('display an empty tree', () => {
    createTreeWithEmptyWorkspace()
  });
});
