import { ComponentClass, DetailedReactHTMLElement, FunctionComponent } from 'react';

export type ComponentPool = {
    [key: string]: ComponentPool | Rendereable;
}

export type Rendereable = string | FunctionComponent<{}> | ComponentClass<{}, any>;

export type Component = {
    component: string;
    props: { [key: string]: unknown };
    children: Component[];
}

export interface IUIElement {
    render(component: Component): JSX.Element | DetailedReactHTMLElement<{}, HTMLElement>;
}

export interface IComponentFactory {
    get(component: Component): Rendereable;
}

export interface IActionFactory {
    getAction(action: string): Function;
}


export type ActionPool = {
    [key: string]: ActionPool | Function;
}
