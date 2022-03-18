---
to: src/stores/<%= h.inflection.camelize(name,true) %>Store.ts
---
import {acceptHMRUpdate, defineStore} from 'pinia';
import {ref,computed} from 'vue';


export const use<%= h.inflection.camelize(name) %>Store = defineStore('<%=  h.inflection.camelize(name,true) %>', () => {
 /* Code Goes Here */


return {
 /* Return actions, computed and refs here */
};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(use<%= h.inflection.camelize(name) %>Store, import.meta.hot));
}


