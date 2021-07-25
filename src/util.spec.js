import {
  isValidMap,
  normalizeMap,
  normalizeNamespace,
  getState,
  setState,
} from './util'

describe('util', () => {

  describe('isValidMap', () => {
    test('It should be a function.', () => {
      expect(typeof isValidMap).toBe('function');
    });

    test('Object should be valid', () => {
      expect(isValidMap({})).toBe(true);
    });

    test('Array should be valid', () => {
      expect(isValidMap([])).toBe(true);
    });
  });

  describe('normalizeMap', () => {
    test('It should be a function.', () => {
      expect(typeof normalizeMap).toBe('function');
    });

    test('Invalid map should return empty array', () => {
      expect(normalizeMap('')).toEqual([]);
    });

    test('Array should return array with key/value', () => {
      const normalizedMap = normalizeMap(['foo']);
      expect(normalizedMap).toEqual([{
        key: 'foo',
        val: 'foo',
      }]);
    });

    test('Object should return array with key/value', () => {
      const normalizedMap = normalizeMap({ 'foo': 'bar' });
      expect(normalizedMap).toEqual([{
        key: 'foo',
        val: 'bar',
      }]);
    });
  });

  describe('normalizeNamespace', () => {
    test('It should be a function.', () => {
      expect(typeof normalizeNamespace).toBe('function');
    });

    test('It should return a function.', () => {
      expect(typeof normalizeNamespace(() => {})).toBe('function');
    });

    test('It should normalize the namespace.', () => {
      const fn = normalizeNamespace((ns, _) => ns);
      expect(fn('test')).toEqual('test/');
    });

    test('It should accept map as first parameter', () => {
      const fn = normalizeNamespace((_, map) => map);
      expect(fn(['test'])).toEqual(['test']);
    });
  });

  describe('getState', () => {
    test('It should return state for root', () => {
      const vue = {$store: {
        state: {foo: 'bar'}
      }};
      expect(getState(vue, '', 'foo')).toEqual('bar');
    });

    test('It should return state for module', () => {
      const vue = {$store: {
        _modulesNamespaceMap: {
          'module': {context: {
            state: {foo: 'bar'},
          }},
        },
      }};
      expect(getState(vue, 'module', 'foo')).toEqual('bar');
    });

    test('It should display error for invalid module', () => {
      const vue = {$store: {
        _modulesNamespaceMap: {
          'moduleA': {context: {
            state: {},
          }},
        },
      }};

      const spy = jest.spyOn(console, 'error').mockImplementation();

      getState(vue, 'moduleA', 'foo');
      getState(vue, 'moduleB', 'foo');
      getState(vue, 'moduleC', 'foo');

      expect(console.error).toHaveBeenCalledTimes(2);

      spy.mockRestore();
    });
  });

  describe('setState', () => {
    // Very simple setter for the vue instance. Normally this would
    // support dot notation, but this should be enough for testing.
    const $set = function (object, key, val) {
      object[key] = val;
    };

    test('It should set state for root', () => {
      const vue = {
        $store: {
          _withCommit: function (fn) {
            fn()
          },
          state: {
            foo: 'bar',
          },
        },
        $set,
      };

      setState(vue, '', 'foo', 'baz');

      expect(vue.$store.state.foo).toEqual('baz');
    });

    test('It should set state for module', () => {
      const vue = {
        $store: {
          _withCommit: function (fn) {
            fn()
          },
          _modulesNamespaceMap: {
            'moduleA': {context: {
              state: {foo: 'bar'},
            }},
          },
        },
        $set,
      }

      setState(vue, 'moduleA', 'foo', 'baz');

      const module = vue.$store._modulesNamespaceMap['moduleA'];

      expect(module.context.state.foo).toEqual('baz');
    });
  });
  
});