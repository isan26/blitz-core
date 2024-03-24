import { IActionFactory, ActionPool } from "./types";

class ActionFactory implements IActionFactory {
    constructor(private readonly actionPool: ActionPool) { }

    getAction(action: string): Function {
        const address = action.split(".");
        const behaviourFromPool = this.getActionFromPool(address);

        return behaviourFromPool;
    }

    private getActionFromPool(address: string[]): Function {
        const action = address.reduce<ActionPool | Function>((acc: ActionPool | Function, step: string) => {
            if (typeof acc === "function") throw new Error(`Action ${address.join(".")} is not a function`);
            if (!acc[step]) throw new Error(`Action ${address.join(".")} not found in the actions pool`);

            return acc[step];
        }, this.actionPool);

        if (typeof action !== "function") {
            throw new Error(`Action ${address.join(".")} is not a function`);
        }

        return action;
    }

}

export default ActionFactory;
