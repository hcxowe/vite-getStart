<template>
    <button
        :class="[
            ns.b(),
            ns.m(size),
            ns.m(type),
            ns.is('disabled', disabled)
        ]"
        :aria-disabled="disabled"
        :disabled="disabled"
        @click="handleClick"
    >
        <span>
            <slot />
        </span>
    </button>
</template>

<script lang="ts" setup>
type Sizes = 'default' | 'small' | 'large'
type Types = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
interface Props {
    size?: Sizes
    type?: Types
    disabled?: boolean
}

// Props
withDefaults(defineProps<Props>(), {
    type: 'default',
    size: 'default',
    disabled: false,
})

// Emits
const emit = defineEmits({
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
})

const ns = {
    ns: 'hcx',
    name: 'button',
    commonSeparator: '-',
    elementSeparator: '__',
    modifierSeparator: '--',
    statePrefix: 'is-',
    b(): string {
        return this.ns + this.commonSeparator + this.name
    },
    m(value: string): string {
        return value === 'default' ? '' : this.b() + this.modifierSeparator + value
    },
    is(key: string, bol: boolean):string {
        return bol ? (this.statePrefix + key) : ''
    }
}

// methods
const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
}
</script>

<style lang="sass">
@import './button.scss'
</style>
