interface StyleInterface {
    class?: string[] | string,
    style?: Record<string, string>
}

interface Theme {

    container?: StyleInterface,

    error?: StyleInterface,

    text?: {
        colors: Record<string, StyleInterface>
        emphasis?: StyleInterface,
        strong?: StyleInterface,
        underline?: StyleInterface
    },

    heading?: StyleInterface & {
        depth?: Record<('1'|'2'|'3'|'4'|'5'|'6'), StyleInterface>
    }

    paragraph?: StyleInterface,

    image?: StyleInterface,

    list?: {
        ul?: StyleInterface,
        ol?: StyleInterface,
        li?: StyleInterface
    },

    link?: StyleInterface,

    code?: {
        inline?: StyleInterface,
        block?: StyleInterface,
    },

    math?: {
        inline?: StyleInterface,
        block?: StyleInterface,
    },

    layout?: {
        center?: StyleInterface
    }

}

export default Theme;
