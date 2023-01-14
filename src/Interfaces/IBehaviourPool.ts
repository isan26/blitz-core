import IBehaviour from "./IBehaviour";

export default interface IBehaviourPool {
    [key: string]: IBehaviourPool | IBehaviour | any;
}
