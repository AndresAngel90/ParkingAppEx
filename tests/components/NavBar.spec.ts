import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { Quasar } from 'quasar'
import NavBar from '~/components/NavBar.vue'

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));

const wrapperFactory = () => mount(NavBar, {
    global: {
        plugins: [Quasar]
    },
});

test('mount component', () => {
    expect(NavBar).toBeTruthy();
});
