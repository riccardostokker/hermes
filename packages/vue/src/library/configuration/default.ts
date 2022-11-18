
import Configuration from '../../core/Configuration';

// Transformers - Markdown
import * as Markdown from '../transformer/markdown';
// Transformers - Directive
import * as Text from '../transformer/directive/text';
import * as Leaf from '../transformer/directive/leaf';
import * as Container from '../transformer/directive/container';
import TailwindDark from '../theme/TailwindDark';

const configuration: Configuration<Record<string, unknown>> = {

    components: {},

    text: {
        interpolate: true
    },

    theme: TailwindDark,

    transformers: {
        directive: {
            text: [
                Text.Default,
                Text.Underline
            ],
            leaf: [
                Leaf.Default
            ],
            container: [
                Container.Default,
                Container.Center,
                Container.Math
            ]
        },
        markdown: [
            Markdown.Root,

            Markdown.Text,
            Markdown.Paragraph,
            Markdown.Heading,
            Markdown.Link,

            Markdown.Emphasis,
            Markdown.Strong,

            Markdown.InlineCode,
            Markdown.Code,

            Markdown.List,
            Markdown.ListItem,

            Markdown.TextDirective,
            Markdown.LeafDirective,
            Markdown.ContainerDirective,

            Markdown.InlineMath,
            Markdown.Math

        ]
    }

};

export default configuration;
