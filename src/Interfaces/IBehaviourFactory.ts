export default interface IBehaviourFactory {
    getBehaviour(behaviour: string): Function;
}
