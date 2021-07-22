# vuex-v-model
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
