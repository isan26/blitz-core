import { ComponentClass, FunctionComponent, ReactNode } from 'react';

export type ComponentPool = {
    [key: string]: ComponentPool | Rendereable;
}

export type Rendereable = string | FunctionComponent<any> | ComponentClass<any, any>;

export type Component = {
    component: string;
    props: { [key: string]: unknown };
    children?: Component[];
}

export interface IUIElement {
    render(component: Component): ReactNode;
}

export interface IComponentFactory {
    get(component: Component): Rendereable;
}

export interface IActionFactory {
    getAction(action: string): Function;
}


export type ActionPool = {
    [key: string]: ActionPool | Action;
}

export type Action = Function | {
    action: Function;
    args: any[];
    execute: boolean;
}
