import {Root} from 'mdast';
import remarkFrontmatter from 'remark-frontmatter';
import {Processor} from 'unified';
import {Literal} from 'unist';
import yaml from 'yaml';
import ProcessorPlugin from '../ProcessorPlugin';


export default class FrontMatterPlugin extends ProcessorPlugin {

    getName(): string {
        return 'frontmatter';
    }

    onSetup(context: Record<string, unknown>, configuration: Record<string, unknown>, processor: Processor): void {

        const plugin = () => {
            return (tree: Root) => {

                try {

                    // Find the first YAML node of the document
                    let data: unknown = null;
                    for (const child of tree.children) {
                        if (child.type === 'yaml') {
                            const yaml_node = child as Literal;
                            data = yaml.parse(yaml_node.value as string);
                            break;
                        }
                    }

                    // If a context exists, set the front matter variable
                    context.front = data;

                } catch (err) {
                    this.debug('Error parsing front YAML: %O', err);
                }

            };
        };

        processor.use(remarkFrontmatter, ['yaml']);
        processor.use(plugin);

    }

    onLoad(): void {
    }

}
