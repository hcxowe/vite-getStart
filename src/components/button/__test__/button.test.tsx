/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('Button.vue', () => {
    it('type primary', () => {
        const wrapper = mount(Button, {
            props: { type: 'primary' },
        })

        expect(wrapper.classes()).toContain('hcx-button--primary')
    })

    it('large size', () => {
        const wrapper = mount(Button, {
            props: { size: 'large' }
        })

        expect(wrapper.classes()).toContain('hcx-button--large')
    })

    it('small size', () => {
        const wrapper = mount(Button, {
            props: { size: 'small' }
        })

        expect(wrapper.classes()).toContain('hcx-button--small')
    })

    it('render text', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'TestButton',
            }
        })
        expect(wrapper.text()).toEqual('TestButton')
    })

    it('handle click', async () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'ClickButton'
            }
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeDefined()
    })

    it('handle click inside', async () => {
        const wrapper = mount(Button, {
            slots: {
                default: '<span class="inner-slot"></span>',
            }
        })

        await wrapper.element.querySelector<HTMLElement>('.inner-slot')!.click()
        expect(wrapper.emitted('click')).toBeDefined()
    })

    it('disabled', async () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true
            }
        })

        expect(wrapper.classes()).toContain('is-disabled')
        expect(wrapper.attributes('disabled')).toBeDefined()

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })
})