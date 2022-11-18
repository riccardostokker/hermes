import {Transformer} from '@hermes-renderer/core';
import {Debugger} from 'debug';
import {ContainerDirective, LeafDirective, TextDirective} from 'mdast-util-directive';
import {Node} from 'unist';
import {Component, ConcreteComponent, DefineComponent, VNode} from 'vue';
import Theme from './Theme';

// Types

export type MarkdownTransformerConstructor<Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>> = new(context: Context, configuration: Configuration, d?: Debugger) => Transformer<Node, VNode | undefined, Context, Configuration>;

export type TextTransformerConstructor<Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>> = new(context: Context, configuration: Configuration, d?: Debugger) => Transformer<TextDirective, VNode | undefined, Context, Configuration>;

export type LeafTransformerConstructor<Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>> = new(context: Context, configuration: Configuration, d?: Debugger) => Transformer<LeafDirective, VNode | undefined, Context, Configuration>;

export type ContainerTransformerConstructor<Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>> = new(context: Context, configuration: Configuration, d?: Debugger) => Transformer<ContainerDirective, VNode | undefined, Context, Configuration>;


export default interface Configuration<Context extends Record<string, unknown> = Record<string, unknown>> extends Record<string, unknown> {

    /**
     * Through this object you can specify custom transformers to take care of the rendering
     */

    transformers: {
        markdown: MarkdownTransformerConstructor<Context, Configuration<Context>>[],
        directive: {
            container: ContainerTransformerConstructor<Context, Configuration<Context>>[],
            leaf: LeafTransformerConstructor<Context, Configuration<Context>>[],
            text: TextTransformerConstructor<Context, Configuration<Context>>[],
        }
    }

    text?: {
        interpolate?: boolean
    },

    /**
     * This is the registry of components to which the renderer will have access.
     * If you want a component to be rendered from your Markdown code, it should be here.
     */
    components: Record<string, ConcreteComponent>,

    /**
     * This is the renderer's theme. Through this, you can set classes on the default elements in the
     * renderer tree, such as spans and such. It also contains other cosmetic settings, but mainly uses
     * classes in order to guarantee flexibility across frameworks.
     */
    theme: Theme

}
