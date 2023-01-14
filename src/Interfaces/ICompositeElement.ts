
import { DetailedReactHTMLElement } from 'react';
import IComponent from './IComponent';

export default interface IUIElement {
    render(component: IComponent): JSX.Element | DetailedReactHTMLElement<{}, HTMLElement>;
}
