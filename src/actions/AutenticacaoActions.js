import firebase from 'firebase';
import b64 from 'base-64';
import {
  MODIFICAR_EMAIL,
  MODIFICAR_SENHA,
  MODIFICAR_NOME,
  CADASTRO_SUCESSO,
  CADASTRO_ERRO,
  LOGIN_SUCESSO,
  LOGIN_ERRO,
  LOGIN_ANDAMENTO,
  CADASTRO_ANDAMENTO,
} from './types';

export const modificarNome = text => {
  return {
    type: MODIFICAR_NOME,
    payload: text,
  };
};

export const modificarEmail = text => {
  return {
    type: MODIFICAR_EMAIL,
    payload: text,
  };
};

export const modificarSenha = text => {
  return {
    type: MODIFICAR_SENHA,
    payload: text,
  };
};

export const cadastrarUsuario = ({nome, email, senha}) => {
  return dispatch => {
    dispatch({type: CADASTRO_ANDAMENTO});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), senha)
      .then(user => {
        const emailB64 = b64.encode(email);
        firebase
          .database()
          .ref(`/contatos/${emailB64}`)
          .push({nome})
          .then(value => success(dispatch));
      })
      .catch(err => error(err, dispatch));
  };
};

export const novoCadastro = () => {
  return {
    type: 'modificar_cadastro',
  };
};

const success = dispatch => {
  dispatch({type: CADASTRO_SUCESSO});
};

const error = (err, dispatch) => {
  dispatch({type: CADASTRO_ERRO, payload: err.message});
};

export const autenticarUsuario = ({email, senha}) => {
  return dispatch => {
    dispatch({type: LOGIN_ANDAMENTO});
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), senha)
      .then(values => loginUsuarioSucesso(dispatch))
      .catch(err => loginUsuarioErro(err, dispatch));
  };
};

const loginUsuarioSucesso = dispatch => {
  dispatch({
    type: LOGIN_SUCESSO,
  });
};

const loginUsuarioErro = (err, dispatch) => {
  dispatch({
    type: LOGIN_ERRO,
    payload: err.message,
  });
};
