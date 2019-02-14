import { gopongmsg } from '../../../../messages/tsmessage/messages';
import { StoreConfig } from '../../store/config';
import { StatePlay } from './play/play';
import { StateStarting } from './starting/starting';
import { IState } from './state';

export interface IStateFactory {
    create(state: gopongmsg.Server.State.Type): IState;
}

export class StateFactory implements IStateFactory {
    private storeConfig: StoreConfig;

    constructor(storeConfig: StoreConfig) {
        this.storeConfig = storeConfig;
    }

    public create(state: gopongmsg.Server.State.Type): IState {
        switch (state) {
            case gopongmsg.Server.State.Type.STATE_PLAY:
                return new StatePlay(this.storeConfig);

            case gopongmsg.Server.State.Type.STATE_START:
                return new StateStarting();
        }

        throw new Error('unknown state type: ' + state);
    }
}
