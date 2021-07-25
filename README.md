# vuex-v-model
[![Version](https://img.shields.io/github/package-json/v/hbackman/vuex-v-model.svg)](https://www.npmjs.com/package/vuex-v-model)
[![License](https://img.shields.io/npm/l/vuex-v-model.svg)](https://github.com/hbackman/vuex-v-model/blob/main/LICENSE)
[![Build Status](https://github.com/hbackman/vuex-v-model/actions/workflows/node.js.yml/badge.svg)](https://github.com/hbackman/vuex-v-model/actions/workflows/node.js.yml)
[![Donate Ko-Fi](https://img.shields.io/badge/donate-ko--fi-blue.svg)](https://ko-fi.com/hbackman)
[![GitHub stars](https://img.shields.io/github/stars/hbackman/vuex-v-model.svg?style=social&label=Star)](https://github.com/hbackman/vuex-map-fields)

vuex-v-model is a library that enables two-way data binding using the Vue v-model directive.

## Install
```
npm install vuex-v-model
```

## Usage
The most basic usage is as simple as providing the fields you want to v-model through `mapModels`. This function accepts the same function parameters as `mapState`.
```
<template>
  <div>
    <input v-model="f_name" placeholder="First Name"/>
    <input v-model="l_name" placeholder="Last Name"/>
  </div>
</template>

<script>
  import { mapModels } from 'vuex-map-models';
  
  export default {
    computed: {
      ...mapModels([
        'f_name',
        'l_name',
      ]),
    },
  };
```

## Author
Hampus Backman <hampus@hbackman.com>

## License
MIT
