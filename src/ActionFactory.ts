import { IActionFactory, ActionPool, Action } from "./types";

class ActionFactory implements IActionFactory {
    constructor(private readonly actionPool: ActionPool) { }

    getAction(action: string): Function {
        if (!action) throw new Error("Action is required");

        const address = action.split(".");

        return this.getActionFromPool(address);
    }

    private getActionFromPool(address: string[]): Function {

        const action = address.reduce<ActionPool | Action>
            ((acc: ActionPool | Action, step: string) =>
                this.isAction(acc) ? acc : acc[step], this.actionPool);

        if (!this.isAction(action)) throw new Error(`Action ${address.join(".")} is not a valid action`);

        if (typeof action === "function") return action;

        return action.action;
    }

    private isAction(action: any): action is Action {
        if (typeof action !== 'object') return false;

        if (typeof action === 'function') return true;
        if (action['action'] && typeof action['action'] === 'function') return true;

        return false;
    }

}

export default ActionFactory;
