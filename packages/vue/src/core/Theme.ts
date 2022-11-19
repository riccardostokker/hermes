interface Theme {

    container?: {
        classes?: Array<string>
    },

    error?: {
        classes?: Array<string>
    },

    text?: {
        colors: Record<string, string>
        emphasis?: {
            classes?: Array<string>
        },
        strong?: {
            classes?: Array<string>
        },
        underline?: {
            classes?: string[]
        }
    },

    heading?: {
        classes?: {
            default?: Array<string>,
            depth?: Record<string, string>
        }
    }

    paragraph?: {
        classes?: Array<string>
    },

    list?: {
        li?: {
            classes?: Array<string>
        },
        ul?: {
            classes?: Array<string>,
        },
        ol?: {
            classes?: Array<string>,
        }
    },

    link?: {
        classes?: Array<string>,
    },

    code?: {
        highlight?: {
            theme?: string
        },
        inline?: {
            classes?: Array<string>
        },
        block?: {
            classes?: Array<string>
        },
    },

    math?: {
        inline?: {
            classes?: Array<string>
        },
        block?: {
            classes?: Array<string>
        },
    },

    layout?: {
        center?: {
            classes?: string[]
        }
    }

}

export default Theme;
