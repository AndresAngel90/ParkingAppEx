## Modules

A custom user module system. Place a `.ts` file with the following template, it will be installed automatically.

```ts
import { UserModule } from '~/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // do something
}
```

### Delete i18n module if you are not using it
