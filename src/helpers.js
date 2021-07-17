const isArray  = (v) => Array.isArray(v);
const isObject = (v) => (v !== null && typeof v === 'object');

const isValidMap = function (map) {
  return isArray(map) || isObject(map);
};

const normalizeMap = function (map) {
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

const normalizeNamespace = function (fn) {
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