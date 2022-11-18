import {ConfigurationFactory} from '@hermes-renderer/core';
import TailwindDark from './theme/TailwindDark';
import TailwindLight from './theme/TailwindLight';

export default {
    TailwindDark: ConfigurationFactory.clone(TailwindDark),
    TailwindLight: ConfigurationFactory.clone(TailwindLight)
};
