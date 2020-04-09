import {
  MODIFICAR_EMAIL,
  MODIFICAR_SENHA,
  MODIFICAR_NOME,
  CADASTRO_SUCESSO,
  CADASTRO_ERRO,
  LOGIN_SUCESSO,
  LOGIN_ERRO,
  MODIFICAR_CADASTRO,
  LOGIN_ANDAMENTO,
  CADASTRO_ANDAMENTO,
} from '../actions/types';

const INITIAL_STATE = {
  nome: '',
  email: '',
  senha: '',
  erroCadastro: '',
  sucessoCadastro: '',
  erroLogin: '',
  sucessoLogin: '',
  loadingLogin: false,
  loadingCadastro: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICAR_NOME:
      return {...state, nome: action.payload};
    case MODIFICAR_EMAIL:
      return {...state, email: action.payload};
    case MODIFICAR_SENHA:
      return {...state, senha: action.payload};
    case CADASTRO_ERRO:
      return {...state, erroCadastro: action.payload, loadingCadastro: false};
    case CADASTRO_SUCESSO:
      return {...state, nome: '', senha: '', sucessoCadastro: '200'};
    case MODIFICAR_CADASTRO:
      return {...state, sucessoCadastro: '', loadingCadastro: false};
    case LOGIN_SUCESSO:
      return {...state, ...INITIAL_STATE, sucessoLogin: '200'};
    case LOGIN_ERRO:
      return {...state, erroLogin: action.payload, loadingLogin: false};
    case LOGIN_ANDAMENTO:
      return {...state, loadingLogin: true};
    case CADASTRO_ANDAMENTO:
      return {...state, loadingCadastro: true};
    default:
      return state;
  }
};
