import { string } from "prop-types";

const store = window.localStorage;

import { GameInstance } from "./GameInstance";
import { AddonList } from "./Interfaces/AddonList";

export class GameManager {
    instances?: Array<GameInstance>;

    addInstance (path: string): void {
        let instance = new GameInstance(path);

        if (!this.instances) {
            this.instances = [];
        }

        this.instances.push(instance);
    }

    /**
     * Get the game instance for a given path.
     *
     * @param path
     */
    getInstance(path: string): any {
        return this.instances.filter(i => {
            return i.path === path;
        });
    }

    loadAddons(path: string, addons: AddonList) {
        let instance = this.getInstance(path);

        console.log('loading addons for ' + instance.toString());
        console.log(addons);

        if (!instance) {
            return;
        }

        //instance.loadAddons(addons);
    }
}
