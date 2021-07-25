const isArray  = (v) => Array.isArray(v);
const isObject = (v) => (v !== null && typeof v === 'object');

const getVuexModule = function (store, namespace) {
  const module = store._modulesNamespaceMap[namespace];
  if (! module)
    console.error('[vuex-v-model] module namespace "' + namespace + '" not found');
  return module;
};

export const isValidMap = function (map) {
  return isArray(map) || isObject(map);
};

export const normalizeMap = function (map) {
  if (! isValidMap(map))
    return [];

  if (isArray(map)) {
    return map.map(key => ({
      key: key,
      val: key,
    }));
  }
  else {
    return Object.keys(map).map(key => ({
      key: key,
      val: map[key],
    }));
  }
};

export const normalizeNamespace = function (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  };
};

export const getState = function (vue, namespace, key) {
  if (namespace) {
    const module = getVuexModule(vue.$store, namespace);
    if (! module)
      return;
    return module.context.state[key];
  }
  return vue.$store.state[key];
};

export const setState = function(vue, namespace, key, val) {
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