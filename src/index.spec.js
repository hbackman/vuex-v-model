import { mapModels } from '.'

describe('index', () => {

  describe('mapModels', () => {
    test('It should be a function', () => {
      expect(typeof mapModels).toBe('function');
    });

    test('It validates the map', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();

      mapModels('test');
      mapModels(5);

      expect(console.error).toHaveBeenCalledTimes(2);

      spy.mockRestore();
    });

    test('It returns a Vue computed property', () => {

      const models = mapModels(['foo']);

      expect(typeof models).toBe('object');

      expect(models['foo']).toHaveProperty('get');
      expect(models['foo']).toHaveProperty('set');

      expect(typeof models['foo'].get).toBe('function');
      expect(typeof models['foo'].set).toBe('function');

      expect(models['foo'].vuex).toBe(true);
    });
  });

});