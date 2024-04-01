import { IComponentFactory, ComponentPool, Rendereable, Component } from "./types";

export default class ComponentFactory implements IComponentFactory {
    constructor(private readonly ComponentPool: ComponentPool) { }

    get(component: Component) {
        const { component: componentName } = component;
        const address = componentName.split(".");

        if (address.length === 1 && this.isHtmlTag(address[0])) return address[0];

        return this.getComponentFromPool(address);
    }

    private isHtmlTag(tag: string) {
        return tag.charAt(0) === tag.charAt(0).toLowerCase();
    }

    private getComponentFromPool(address: string[]): Rendereable {
        const component = address.reduce<ComponentPool | Rendereable>((acc: ComponentPool | Rendereable, step: string) => this.isComponent(acc) ? acc : acc[step], this.ComponentPool);

        if (!this.isComponent(component)) throw new Error(`Component ${address.join(".")} is not a valid component`);

        return component;
    }

    private isComponent(component: unknown): component is Rendereable {
        return (typeof component === 'function' || typeof component === 'string');
    }

}
