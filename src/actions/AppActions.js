import {
  MODIFICAR_CONTATO_EMAIL,
  ADICIONAR_CONTATO_ERRO,
  ADICIONAR_CONTATO_SUCESSO,
  LISTAR_CONTATO_USUARIO,
  MODIFICAR_MENSAGEM,
  ENVIAR_MENSAGEM,
  LISTAR_CONVERSA_USUARIO,
  ENVIAR_MENSAGEM_SUCESSO,
  LISTAR_CONVERSAS_USUARIO,
} from './types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const modificarContatoEmail = text => {
  return {
    type: MODIFICAR_CONTATO_EMAIL,
    payload: text,
  };
};

export const adicionarContato = email => {
  return dispatch => {
    const emailB64 = b64.encode(email);
    firebase
      .database()
      .ref(`/contatos/${emailB64}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const dadosUsuario = _.first(_.values(snapshot.val()));

          const {currentUser} = firebase.auth();
          let emailUsuarioB64 = b64.encode(currentUser.email);

          firebase
            .database()
            .ref(`/usuarios_contatos/${emailUsuarioB64}`)
            .push({email, nome: dadosUsuario.nome})
            .then(() => adicionarContatoSucesso(dispatch))
            .catch(err => adicionarContatoErro(err.message, dispatch));
        } else {
          dispatch({
            type: ADICIONAR_CONTATO_ERRO,
            payload: 'E-mail informado não corresponde a um usuário válido!',
          });
        }
      });
  };
};

const adicionarContatoSucesso = dispatch => {
  dispatch({
    type: ADICIONAR_CONTATO_SUCESSO,
    payload: true,
  });
};

const adicionarContatoErro = (err, dispatch) => {
  dispatch({
    type: ADICIONAR_CONTATO_ERRO,
    payload: err,
  });
};

export const habilitarInclusaoContato = () => ({
  type: ADICIONAR_CONTATO_SUCESSO,
  payload: false,
});

export const modificarMensagem = text => ({
  type: MODIFICAR_MENSAGEM,
  payload: text,
});

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
  const {currentUser} = firebase.auth();
  const currentUserEmail = currentUser.email;
  const emailUsuarioB64 = b64.encode(currentUser.email);
  const emailContatoB64 = b64.encode(contatoEmail);

  return dispatch => {
    firebase
      .database()
      .ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
      .push({mensagem, tipo: 'e'})
      .then(() => {
        firebase
          .database()
          .ref(`/mensagens/${emailContatoB64}/${emailUsuarioB64}`)
          .push({mensagem, tipo: 'r'})
          .then(() => dispatch({type: ENVIAR_MENSAGEM_SUCESSO}))
          .then(() => {
            firebase
              .database()
              .ref(`/usuario_conversas/${emailUsuarioB64}/${emailContatoB64}`)
              .set({nome: contatoNome, email: contatoEmail})
              .then(() => {
                firebase
                  .database()
                  .ref(`/contatos/${emailUsuarioB64}`)
                  .once('value')
                  .then(snapshot => {
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    firebase
                      .database()
                      .ref(
                        `/usuario_conversas/${emailContatoB64}/${emailUsuarioB64}`,
                      )
                      .set({nome: dadosUsuario.nome, email: currentUserEmail});
                  });
              });
          });
      });
  };
};

export const conversaUsuarioFetch = contatoEmail => {
  const {currentUser} = firebase.auth();
  const usuarioEmailB64 = b64.encode(currentUser.email);
  const contatoEmailB64 = b64.encode(contatoEmail);

  return dispatch => {
    firebase
      .database()
      .ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
      .on('value', snapshot => {
        dispatch({type: LISTAR_CONVERSA_USUARIO, payload: snapshot.val()});
      });
  };
};

export const contatosUsuariosFetch = () => {
  const {currentUser} = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);

  return dispatch => {
    firebase
      .database()
      .ref(`/usuarios_contatos/${emailUsuarioB64}`)
      .on('value', snapshot => {
        dispatch({type: LISTAR_CONTATO_USUARIO, payload: snapshot.val()});
      });
  };
};

export const conversasUsuarioFetch = () => {
  const {currentUser} = firebase.auth();
  const usuarioEmailB64 = b64.encode(currentUser.email);

  return dispatch => {
    firebase
      .database()
      .ref(`/usuario_conversas/${usuarioEmailB64}`)
      .on('value', snapshot => {
        dispatch({type: LISTAR_CONVERSAS_USUARIO, payload: snapshot.val()});
      });
  };
};
