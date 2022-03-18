---
to: src/pages/<%= name %>.vue
---
<template>
<div class="<%= h.changeCase.paramCase(name) %>"></div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" src="~/styles/_pageFiles/<%= name %>.css"/>

<route lang="JSON5">
{
  name: "<%= name %>"
  meta:{}
}
</route>
