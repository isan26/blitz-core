import { createElement } from "react"
import IUIElement from "../Interfaces/ICompositeElement";
import IBehaviourFactory from "../Interfaces/IBehaviourFactory";
import IComponentFactory from "../Interfaces/IComponentFactory";
import IComponent from "../Interfaces/IComponent";

export default class UIElement implements IUIElement {
    private behaviours: IBehaviourFactory;
    private components: IComponentFactory;

    constructor(behaviours: IBehaviourFactory, components: IComponentFactory) {
        this.behaviours = behaviours;
        this.components = components;
    }

    render(component: IComponent): JSX.Element {
        const uiComponent = this.components.get(component);
        const newProps = this.replaceBehaviours(component.props);
        const children = component.children ? this.renderChildren(component) : [];


        return createElement(uiComponent, newProps, ...children);
    }

    private replaceBehaviours(props: { [key: string]: any } = {}): { [key: string]: any } {
        const newProps: { [key: string]: any } = {};
        const keys = Object.getOwnPropertyNames(props);

        keys.forEach(key => {
            if (typeof props[key] === 'object') {
                if (Array.isArray(props[key])) {
                    newProps[key] = props[key].map((item: any) => this.replaceBehaviours(item));
                }
                else
                    if (props[key]['behaviour']) {
                        const behaviour = this.behaviours.getBehaviour(props[key]['behaviour']);
                        const execute = props[key]['execute'];

                        if (props[key]['args']) {
                            const args = props[key]['args'];
                            newProps[key] = () => behaviour(...args);
                        } else {
                            newProps[key] = behaviour;
                        }

                        if (execute) {
                            newProps[key] = newProps[key]();
                        }

                    } else {
                        newProps[key] = this.replaceBehaviours(props[key]);
                    }
            } else {
                newProps[key] = props[key];
            }
        });


        return newProps;
    }

    private renderChildren(component: IComponent): JSX.Element[] {
        const { children } = component;
        if (!children) return [];
        if (typeof children === 'string') return children;
        return children.map(child => typeof child === 'string' ? child : this.render(child));
    }

}
