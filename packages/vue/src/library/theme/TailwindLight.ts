import Theme from '@/core/Theme';

const theme: Theme = {

        container: {
            class: [
                'bg-slate-800',
                'text-white',
                'p-4',
                'overflow-y-auto'
            ]
        },

        text: {
            colors: {
                'red': {
                    class: 'text-red-500'
                },
                'emerald': {
                    class: 'text-emerald-500'
                }
            }
        },

        heading: {
            class: [
                'font-bold',
                'my-2'
            ],
            depth: {
                '1': {
                    class: 'text-5xl'
                },
                '2': {
                    class: 'text-4xl'
                },
                '3': {
                    class: 'text-3xl'
                },
                '4': {
                    class: 'text-2xl'
                },
                '5': {
                    class: 'text-1xl'
                },
                '6': {
                    class: 'text-lg'
                }
            }
        },

        paragraph: {},

        list: {
            li: {
                class: []
            },
            ul: {
                class: [
                    'list-disc list-inside'
                ]
            },
            ol: {
                class: [
                    'list-decimal list-inside'
                ]
            }
        },

        link: {
            class: [
                'text-red-500',
                'hover:underline'
            ]
        },

        code: {
            inline: {
                class: [
                    'p-1',
                    'bg-gray-900',
                    'rounded'
                ]
            },
            block: {
                class: [
                    'leading-snug',
                    'p-2',
                    'bg-gray-800',
                    'rounded',
                    'overflow-x-auto'
                ]
            }
        },

        layout: {
            center: {
                class: [
                    'flex flex-col justify-center items-center'
                ]
            }
        }

    }
;

export default theme;
