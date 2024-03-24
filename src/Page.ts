import CompositeElement from "./CompositeElement";
import { IUIElement, Component, IActionFactory, IComponentFactory } from "./types";


export default class Page implements IUIElement {
    private renderer: CompositeElement;
    private page: Component[] = [];

    constructor(behaviours: IActionFactory, components: IComponentFactory) {
        this.renderer = new CompositeElement(behaviours, components);
    }

    public setConfig(config: Component[]) {
        this.page = config;
        return this;
    }

    public render(): JSX.Element {
        const root: Component = {
            component: "div",
            props: {},
            children: this.page
        }

        return this.renderer.render(root);
    }

}
