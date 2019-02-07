import { StoreConfig } from '../../store/config';
import { StateType } from '../networkTypes';
import { StatePlay } from './play/play';
import { StateStarting } from './starting/starting';
import { IState } from './state';

export interface IStateFactory {
    create(state: StateType): IState;
}

export class StateFactory implements IStateFactory {
    private storeConfig: StoreConfig;

    constructor(storeConfig: StoreConfig) {
        this.storeConfig = storeConfig;
    }

    public create(state: StateType): IState {
        switch (state) {
            case StateType.StateTypePlay:
                return new StatePlay(this.storeConfig);

            case StateType.StateTypeStarting:
                return new StateStarting();
        }

        throw new Error('unknown state type: ' + state);
    }
}
