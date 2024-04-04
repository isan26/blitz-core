import ComponentFactory from "./ComponentFactory";
import ActionFactory from "./ActionFactory";
import Page, { ParentConfig } from "./Page";

import { Component, ActionPool, ComponentPool } from "./types";

function blitz(components: ComponentPool, actions: ActionPool = {}) {
    const componentFactory = new ComponentFactory(components);
    const behaviourFactory = new ActionFactory(actions);
    const page = new Page(behaviourFactory, componentFactory);

    return (config: Component[], parentConfig?: ParentConfig) => page.setConfig(config, parentConfig).render();
};


export type { ActionPool, ComponentPool };
export default blitz;
