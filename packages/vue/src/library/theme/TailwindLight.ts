import Theme from '../../core/Theme';

const theme: Theme = {

    container: {
        classes: [
            'bg-stone-100',
            'p-4',
            'transition',
            'transition-all',
            'duration-500'
        ]
    },

    text: {
        colors: {
            'red': 'text-red-500',
            'emerald': 'text-emerald-500'
        }
    },

    heading: {
        classes: {
            default: [
                'font-bold',
                'my-2'
            ],
            depth: {
                '1': 'text-5xl',
                '2': 'text-4xl',
                '3': 'text-3xl',
                '4': 'text-2xl',
                '5': 'text-1xl',
                '6': 'text-lg'
            }
        }
    },

    paragraph: {
    },

    list: {
        li: {
            classes: []
        },
        ul: {
            classes: [
                'list-disc list-inside'
            ]
        },
        ol: {
            classes: [
                'list-decimal list-inside'
            ]
        }
    },

    link: {
        classes: [
            'text-red-500',
            'hover:underline'
        ]
    },

    code: {
        highlight: {
            theme: 'github'
        },
        inline: {
            classes: [
                'p-1',
                'text-white',
                'bg-gray-900',
                'rounded'
            ]
        },
        block: {
            classes: [
                'leading-snug',
                'p-2',
                'text-white',
                'bg-gray-800',
                'rounded',
                'overflow-x-auto'
            ]
        }
    },

    layout: {
        center: {
            classes: [
                'flex flex-col justify-center items-center'
            ]
        }
    }

};

export default theme;
