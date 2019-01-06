import { AddonList } from "./Interfaces/AddonList";

export class GameInstance {
    path: string;
    addons?: AddonList;

    constructor (path: string) {
        this.path = path;
    }

    loadAddons(list: AddonList): void {
        this.addons = list
    }
}
