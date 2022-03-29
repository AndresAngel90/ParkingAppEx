import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { Quasar } from 'quasar'
import Login from '~/pages/Login.vue'

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}));

const wrapperFactory = () => mount(Login, {
    global: {
        plugins: [Quasar]
    },
})

test('mount component', () => {
    expect(Login).toBeTruthy();
})

test('Try login', async () => {
    const wrapper = wrapperFactory();
    const loginMethod = vi.spyOn(wrapper.vm, "login");
    await wrapper.get('[data-test="emailInput"]').setValue("josedanielparra05@gmail.com");
    await wrapper.get('[data-test="passInput"]').setValue("123456");
    await wrapper.get('[data-test="loginForm"]').trigger('submit');

    expect(loginMethod).toHaveBeenCalledOnce();
})

test('Try login with missing password', async () => {
    const wrapper = wrapperFactory();
    await wrapper.get('[data-test="emailInput"]').setValue("josedanielparra05@gmail.com");
    await wrapper.get('[data-test="loginForm"]').trigger('submit');

    expect(wrapper.get('[data-test="loginForm"]').text()).toContain("Field is required");
})