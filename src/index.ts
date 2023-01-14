import IComponentPool from "./Interfaces/IComponentPool";
import IBehaviourPool from "./Interfaces/IBehaviourPool";
import ComponentFactory from "./Classes/ComponentFactory";
import BehaviourFactory from "./Classes/BehaviourFactory";
import Page from "./Classes/Page";

function blitz(components: IComponentPool, behaviours: IBehaviourPool) {
    const componentFactory = new ComponentFactory(components);
    const behaviourFactory = new BehaviourFactory(behaviours);
    const page = new Page(behaviourFactory, componentFactory);

    return (config: any[]) => page.setConfig(config).render();
};

export default blitz;
