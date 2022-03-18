---
to: components/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name,true) %>.vue
---

<template>
<div class="<%= h.changeCase.paramCase(name) %>"></div>
</template>

<script setup lang="ts">
/* Code Goes Here */
</script>

<style lang="postcss" src="./<%= h.inflection.camelize(name,true) %>.css" />
