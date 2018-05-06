let landscape = true

export default {
    // cdn     : 'https://wisdom.lufei.so/fisher',
    cdn     : '.',
    bgColor : 0x272d37,

    width   : 1334,
    height  : 768,

    get landscape() {
        return landscape
    },

    set landscape(v) {
        landscape = v
    }
}