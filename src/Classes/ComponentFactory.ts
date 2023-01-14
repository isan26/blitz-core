import IComponentFactory from "../Interfaces/IComponentFactory";
import IComponent from "../Interfaces/IComponent";
import IComponentPool from "../Interfaces/IComponentPool";
import { FunctionComponent } from "react";


export default class ComponentFactory implements IComponentFactory {

    private ComponentPool: IComponentPool;

    constructor(ComponentPool: IComponentPool) {
        this.ComponentPool = ComponentPool;
    }

    get(component: IComponent): FunctionComponent | string {
        const { component: componentName } = component;
        const address = componentName.split(".");

        if (address.length === 1 && this.isHtmlTag(address[0])) {
            return address[0];
        }

        const componentFromPool = this.getComponentFromPool(address);

        if (!componentFromPool) {
            throw new Error(`Component ${componentName} not found in the component pool`);
        }

        return componentFromPool;
    }

    private isHtmlTag(tag: string) {
        return tag.charAt(0) === tag.charAt(0).toLowerCase();
    }

    private getComponentFromPool(address: string[]): FunctionComponent | null {
        let component = { ...this.ComponentPool } as any;

        for (let i = 0; i < address.length; i++) {
            if (!component[address[i]]) {
                return null;
            }
            component = component[address[i]];
        }

        return component;
    }

}
