import {LISTAR_CONVERSA_USUARIO} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTAR_CONVERSA_USUARIO:
      return action.payload;
    default:
      return state;
  }
};
