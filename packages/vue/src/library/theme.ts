import {Utility} from '@hermes-renderer/core';
import TailwindDark from './theme/TailwindDark';
import TailwindLight from './theme/TailwindLight';
import StylesLight from './theme/StylesLight';
import StylesDark from './theme/StylesDark';

export default {
    TailwindDark: Utility.clone(TailwindDark),
    TailwindLight: Utility.clone(TailwindLight),
    StylesDark: Utility.clone(StylesDark),
    StylesLight: Utility.clone(StylesLight)
};
