import IUIElement from "../Interfaces/ICompositeElement";
import IComponent from "../Interfaces/IComponent";
import IBehaviourFactory from "../Interfaces/IBehaviourFactory";
import IComponentFactory from "../Interfaces/IComponentFactory";
import UIElement from "../Classes/CompositeElement";


export default class Page implements IUIElement {
    private renderer: IUIElement;
    private page: IComponent[] = [];

    constructor(behaviours: IBehaviourFactory, components: IComponentFactory) {
        this.renderer = new UIElement(behaviours, components);
    }

    public setConfig(config: IComponent[]) {
        this.page = config;
        return this;
    }

    public render(): JSX.Element {
        const root: IComponent = {
            component: "div",
            props: {},
            children: this.page
        }

        return this.renderer.render(root);
    }

}
