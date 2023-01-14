export default interface IComponent {
    component: string;
    props: { [key: string]: any };
    children: IComponent[];
}
