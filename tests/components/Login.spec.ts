import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router'
import { test, expect } from 'vitest';
import { Quasar } from 'quasar';
import Login from '~/pages/Login.vue';
import axios from 'axios';

const loginMockResponse = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6I",
    "user": {
        "email": "josedanielparra05@outlook.com",
        "id": 1
    }
}

const wrapperFactory = () => mount(Login, {
    global: {
        plugins: [Quasar],
        stubs: ["router-link", "router-view"],
    },
});

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: () => { }
    }))
}));


test('Login with right data', async () => {
    const routerPushMock = vi.fn();
    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
        routerPushMock
    }));
    const wrapper = wrapperFactory();
    vi.spyOn(axios, 'post').mockResolvedValue({ data: loginMockResponse });

    await wrapper.get('[data-test="emailInput"]').setValue("josedanielparra05@gmail.com");
    await wrapper.get('[data-test="passInput"]').setValue("12345");

    await wrapper.get('[data-test="loginForm"]').trigger('submit');

    expect(routerPushMock).toHaveBeenCalledOnce();
});
