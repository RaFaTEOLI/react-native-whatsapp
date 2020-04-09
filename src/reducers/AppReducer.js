import {
  MODIFICAR_CONTATO_EMAIL,
  ADICIONAR_CONTATO_ERRO,
  ADICIONAR_CONTATO_SUCESSO,
  MODIFICAR_MENSAGEM,
  ENVIAR_MENSAGEM_SUCESSO,
} from '../actions/types';

const INITIAL_STATE = {
  adicionar_contato_email: '',
  adicionar_cadastro_erro: '',
  adicionar_cadastro_sucesso: false,
  mensagem: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICAR_CONTATO_EMAIL:
      return {...state, adicionar_contato_email: action.payload};
    case ADICIONAR_CONTATO_ERRO:
      return {...state, adicionar_cadastro_erro: action.payload};
    case ADICIONAR_CONTATO_SUCESSO:
      return {
        ...state,
        adicionar_cadastro_sucesso: action.payload,
        adicionar_contato_email: '',
      };
    case MODIFICAR_MENSAGEM:
      return {...state, mensagem: action.payload};
    case ENVIAR_MENSAGEM_SUCESSO:
      return {...state, mensagem: ''};
    default:
      return state;
  }
};
