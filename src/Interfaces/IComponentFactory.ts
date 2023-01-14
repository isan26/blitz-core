import IComponent from "./IComponent";
import { FunctionComponent } from "react";

export default interface IComponentFactory {
    get(component: IComponent): FunctionComponent | string;
}
