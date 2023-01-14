import IBehaviourFactory from "../Interfaces/IBehaviourFactory";
import IBehaviourPool from "../Interfaces/IBehaviourPool";

class BehaviourFactory implements IBehaviourFactory {

    private behaviourPool: IBehaviourPool;
    constructor(BehaviourPool: IBehaviourPool) {
        this.behaviourPool = BehaviourPool;
    }

    getBehaviour(behaviour: string): Function {
        const address = behaviour.split(".");
        const behaviourFromPool = this.getBehaviourFromPool(address);

        if (!behaviourFromPool) {
            throw new Error(`Behaviour ${behaviour} not found in the behaviour pool`);
        }

        return behaviourFromPool;
    }

    private getBehaviourFromPool(address: string[]): Function | null {
        let behaviour = { ...this.behaviourPool } as any;
        for (let i = 0; i < address.length; i++) {
            if (!behaviour[address[i]]) {
                return null;
            }
            behaviour = behaviour[address[i]];
        }

        return behaviour;
    }

}

export default BehaviourFactory;
