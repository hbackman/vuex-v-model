import './helpers'

const getVuexModule = function (store, namespace) {
  const module = store._modulesNamespaceMap[namespace];
  if (! module)
    console.error('[vuex-v-model] module namespace "' + namespace + '" not found');
  return module;
};

const getState = function (vue, namespace, key) {
  if (namespace) {
    const module = getVuexModule(vue.$store, namespace);
    if (! module)
      return;
    return module.context.state[key];
  }
  return vue.$store.state[key];
};

const setState = function (vue, namespace, key, val) {
  if (namespace) {
    const module = getVuexModule(vue.$store, namespace);
    if (! module)
      return;
  
    vue.$store._withCommit(() => {
      vue.$set(module.context.state, key, val);
    });
    return;
  }
  vue.$store._withCommit(() => {
    vue.$set(vue.$store.state, key, val);
  });
};

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