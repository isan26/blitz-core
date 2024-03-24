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

    private getComponentFromPool(address: string[]) {
        const component = address.reduce((acc: any, step: string) => acc[step] || acc, this.ComponentPool);

        if (component === undefined) throw new Error(`Component ${address.join(".")} not found in ComponentPool`);

        return component as Rendereable;
    }

}
