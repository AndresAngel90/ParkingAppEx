---
to: components/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name,true) %>.test.ts
---
import { it, describe, expect, assert } from 'vitest'


describe('<%= h.inflection.camelize(name,true) %>.', () => {
  it('renders', () => {
    /* Code Goes Here */
  })
})
