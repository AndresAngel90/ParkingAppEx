---
to: components/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name,true) %>.css
---
.<%= h.changeCase.paramCase(name) %> {
  /* Styles here */
}
