import {
  isValidMap,
  normalizeMap,
  normalizeNamespace,

  getState,
  setState,
} from './util';

export const mapModels = normalizeNamespace((namespace, map) => {
  if (! isValidMap(map))
    console.error('[vuex-v-model] mapModels: mapper parameter must be either an Array or an Object');

  const res = {};

  normalizeMap(map).forEach(({ key }) => {
    res[key] = {
      get ( ) { return getState(this, namespace, key)    },
      set (v) { return setState(this, namespace, key, v) },
      cache: true,
    }
    res[key].vuex = true;
  });

  return res;
});