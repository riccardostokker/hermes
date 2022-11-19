import Theme from '@/core/Theme';

const theme: Theme = {

        container: {
            style: {
                width: '100%',
                height: '100%',
                overflow: 'auto'
            }
        },

        text: {
            colors: {
                'red': {
                    style: {
                        color: '#b91c1c'
                    }
                },
                'emerald': {
                    style: {
                        color: '#10b981'
                    }
                }
            }
        },

        heading: {
            depth: {
                '1': {
                    style: {
                        'font-size': '2.25rem',
                        'font-weight': 'bold'
                    }
                },
                '2': {
                    style: {
                        'font-size': '2rem',
                        'font-weight': 'bold'
                    }
                },
                '3': {
                    style: {
                        'font-size': '1.75rem',
                        'font-weight': 'bold'
                    }
                },
                '4': {
                    style: {
                        'font-size': '1.5rem',
                        'font-weight': 'bold'
                    }
                },
                '5': {
                    style: {
                        'font-size': '1.25rem',
                        'font-weight': 'bold'
                    }
                },
                '6': {
                    style: {
                        'font-size': '1rem',
                        'font-weight': 'bold'
                    }
                }
            }
        },

        paragraph: {},

        list: {
            li: {
                class: []
            },
            ul: {
            },
            ol: {
            }
        },

        link: {
        },

        code: {
            inline: {
            },
            block: {
            }
        },

        layout: {
            center: {
            }
        }

    }
;

export default theme;
