import CompositeElement from "./CompositeElement";
import { IUIElement, Component, IActionFactory, IComponentFactory } from "./types";


export default class Page implements IUIElement {
    private renderer: CompositeElement;
    private page: Component[] = [];
    private parentConfig: ParentConfig = { component: "div", props: {} };

    constructor(behaviours: IActionFactory, components: IComponentFactory) {
        this.renderer = new CompositeElement(behaviours, components);
    }

    public setConfig(config: Component[], parentConfig?: ParentConfig) {
        this.page = config;
        if (parentConfig) {
            this.parentConfig = parentConfig;
        }
        return this;
    }

    public render(): JSX.Element {
        const root: Component = {
            component: this.parentConfig.component,
            props: this.parentConfig.props,
            children: this.page
        }

        return this.renderer.render(root);
    }

}

export type ParentConfig = {
    component: string,
    props: { [key: string]: any },
}
