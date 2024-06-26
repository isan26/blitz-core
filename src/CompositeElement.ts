import { createElement } from "react"
import { IActionFactory } from "./types";
import { IComponentFactory, IUIElement, Component } from "./types";

export default class CompositeElement implements IUIElement {

    constructor(
        private readonly actions: IActionFactory,
        private readonly components: IComponentFactory
    ) { }

    render(component: Component): JSX.Element {
        const uiComponent = this.components.get(component);
        const newProps = this.replaceActions(component.props);
        const children = component.children ? this.renderChildren(component) : [];

        return createElement(uiComponent, newProps, ...children);
    }

    private replaceActions(props: { [key: string]: any } = {}): { [key: string]: any } {
        const newProps: { [key: string]: any } = {};
        const keys = Object.getOwnPropertyNames(props);

        keys.forEach(key => {
            if (typeof props[key] === 'object' &&  props[key] && props[key]['action']) {
                const action = this.actions.getAction(props[key]['action']);
                if (!action) return;

                const execute = props[key]['execute'];

                const args = props[key]['args'];
                newProps[key] = args ? () => action(...args) : action;

                if (execute) {
                    newProps[key] = newProps[key]();
                }
                return;
            }

            newProps[key] = props[key];
        });

        return newProps;
    }

    private renderChildren(component: Component): JSX.Element[] {
        const { children } = component;
        if (!children) return [];
        if (typeof children === 'string') return children;
        return children.map(child => typeof child === 'string' ? child : this.render(child));
    }

}
