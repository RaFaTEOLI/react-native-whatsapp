import * as yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';

import React, {Fragment, Component} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import {
  modificarNome,
  modificarEmail,
  modificarSenha,
  cadastrarUsuario,
} from '../actions/AutenticacaoActions';

import imagemFundo from '../img/background_image.jpg';

class Form extends Component {
  renderBtnCadastro(handleSubmit, isValid) {
    if (this.props.loadingCadastro) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={handleSubmit}
          disabled={!isValid}
          title="Login">
          <Text style={styles.txtCadastro}>CADASTRAR</Text>
        </TouchableOpacity>
      );
    }
  }
  render() {
    return (
      <ImageBackground style={styles.imagem} source={imagemFundo}>
        <Formik
          initialValues={{
            nome: this.props.nome,
            email: this.props.email,
            senha: this.props.senha,
          }}
          onSubmit={values => {
            //Alert.alert(JSON.stringify(values));
            setDispatcher(this.props, values);
          }}
          validationSchema={yup.object().shape({
            nome: yup.string().required('Preencha o campo de nome'),
            email: yup
              .string()
              .email('Digite um e-mail válido')
              .required('Preencha o campo de e-mail'),
            senha: yup
              .string()
              .min(6, 'Senha deve ter mais que 6 caracteres')
              .required('Preencha o campo de senha'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <View style={styles.container}>
                <View style={styles.titulo}>
                  <Text style={styles.textoTitulo}>Cadastro</Text>
                </View>
                <View style={styles.form}>
                  <TextInput
                    style={styles.txtInput}
                    value={values.nome}
                    onChangeText={handleChange('nome')}
                    onBlur={() => setFieldTouched('nome')}
                    placeholder="Nome"
                    underlineColorAndroid={'#adadad'}
                  />
                  {touched.nome && errors.nome && (
                    <Text style={styles.error}>{errors.nome}</Text>
                  )}

                  <TextInput
                    style={styles.txtInput}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    placeholder="E-mail"
                    underlineColorAndroid={'#adadad'}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <TextInput
                    style={styles.txtInput}
                    value={values.senha}
                    onChangeText={handleChange('senha')}
                    placeholder="Senha"
                    onBlur={() => setFieldTouched('senha')}
                    secureTextEntry={true}
                    underlineColorAndroid={'#adadad'}
                  />
                  {touched.senha && errors.senha && (
                    <Text style={styles.error}>{errors.senha}</Text>
                  )}
                  {cadastrado(this.props)}
                  <Text style={styles.error}>{this.props.erroCadastro}</Text>
                </View>
                <View style={styles.form}>
                  {this.renderBtnCadastro(handleSubmit, isValid)}
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.AutenticacaoReducer.nome,
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroCadastro: state.AutenticacaoReducer.erroCadastro,
  sucessoCadastro: state.AutenticacaoReducer.sucessoCadastro,
  loadingCadastro: state.AutenticacaoReducer.loadingCadastro,
});

const setDispatcher = (props, values) => {
  props.modificarNome(values.nome);
  props.modificarEmail(values.email.trim());
  props.modificarSenha(values.senha);

  const {nome, email, senha} = values;
  props.cadastrarUsuario({nome, email, senha});
};

const cadastrado = props => {
  if (props.sucessoCadastro === '200') {
    props.navigation.navigate('Welcome');
  }
};

export default connect(
  mapStateToProps,
  {modificarNome, modificarEmail, modificarSenha, cadastrarUsuario},
)(Form);

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    width: null,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoTitulo: {
    fontSize: 25,
    backgroundColor: 'transparent',
    color: 'black',
  },
  textoCadastro: {
    fontSize: 20,
  },
  form: {
    flex: 4,
    justifyContent: 'center',
  },
  formButton: {
    flex: 1,
  },
  txtInput: {
    fontSize: 20,
    height: 45,
  },
  botaoCadastro: {
    backgroundColor: '#115E54',
    padding: 10,
    alignItems: 'center',
  },
  txtCadastro: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
