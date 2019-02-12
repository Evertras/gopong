import { ServerState } from '../../network/messageTypes';
import { StoreConfig } from '../../store/config';
import { StatePlay } from './play/play';
import { StateStarting } from './starting/starting';
import { IState } from './state';

export interface IStateFactory {
    create(state: ServerState): IState;
}

export class StateFactory implements IStateFactory {
    private storeConfig: StoreConfig;

    constructor(storeConfig: StoreConfig) {
        this.storeConfig = storeConfig;
    }

    public create(state: ServerState): IState {
        switch (state) {
            case ServerState.Play:
                return new StatePlay(this.storeConfig);

            case ServerState.Starting:
                return new StateStarting();
        }

        throw new Error('unknown state type: ' + state);
    }
}
