let entityIDCounter = 1;

export class EntityID {
    protected entityID: number;

    constructor() {
        this.entityID = entityIDCounter++;
    }

    get ID() {
        return this.entityID;
    }
}
