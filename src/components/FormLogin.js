import * as yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';

import React, {Component, Fragment} from 'react';
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
  modificarEmail,
  modificarSenha,
  autenticarUsuario,
  novoCadastro,
} from '../actions/AutenticacaoActions';
// import imagemFundo from '../img/bg.jpg';
import imagemFundo from '../img/bg_light.png';

class Form extends Component {
  autenticar() {
    const {email, senha} = this.props;
    this.props.autenticarUsuario({email, senha});
  }
  renderBtnAcessar(handleSubmit, isValid) {
    if (this.props.loadingLogin) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <TouchableOpacity
          style={styles.botaoLogin}
          onPress={handleSubmit}
          disabled={!isValid}
          title="Login">
          <Text style={styles.txtLogin}>ACESSAR</Text>
        </TouchableOpacity>
      );
    }
  }
  render() {
    return (
      <ImageBackground style={styles.imagem} source={imagemFundo}>
        <Formik
          initialValues={{
            email: this.props.email,
            senha: this.props.senha,
          }}
          onSubmit={values => {
            //Alert.alert(JSON.stringify(values));
            this.autenticar();
            setDispatcher(this.props, values);
          }}
          validationSchema={yup.object().shape({
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
            handleSubmit,
            isValid,
          }) => (
            <Fragment>
              <View style={styles.container}>
                <View style={styles.titulo}>
                  <Text style={styles.textoTitulo}>WhatsApp Clone</Text>
                </View>
                <View style={styles.form}>
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

                  {logado(this.props)}
                  <Text style={styles.error}>{this.props.erroLogin}</Text>

                  <TouchableOpacity
                    onPress={() => cadastrarNovamente(this.props)}>
                    <Text style={styles.textoCadastro}>
                      Ainda não tem cadastro? Cadastre-se
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.form}>
                  {this.renderBtnAcessar(handleSubmit, isValid)}
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
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroLogin: state.AutenticacaoReducer.erroLogin,
  sucessoLogin: state.AutenticacaoReducer.sucessoLogin,
  loadingLogin: state.AutenticacaoReducer.loadingLogin,
});

const setDispatcher = (props, values) => {
  props.modificarEmail(values.email.trim());
  props.modificarSenha(values.senha);
};

const logado = props => {
  if (props.sucessoLogin === '200') {
    props.navigation.navigate('Principal');
  }
};

const cadastrarNovamente = props => {
  props.navigation.navigate('Cadastro');
  props.novoCadastro();
};

export default connect(
  mapStateToProps,
  {
    modificarEmail,
    modificarSenha,
    autenticarUsuario,
    novoCadastro,
  },
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
    flex: 2,
  },
  txtInput: {
    fontSize: 20,
    height: 45,
  },
  botaoLogin: {
    backgroundColor: '#115E54',
    padding: 10,
    alignItems: 'center',
  },
  txtLogin: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
