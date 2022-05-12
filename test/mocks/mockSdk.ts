const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  ids: {
    app: 'test-app'
  },
  field: {
    getValue: jest.fn().mockReturnValueOnce({}),
    setValue: jest.fn(),
  }
};

export { mockSdk };
