export default interface IComponentPool {
    [key: string]: IComponentPool | JSX.Element | any;
}
