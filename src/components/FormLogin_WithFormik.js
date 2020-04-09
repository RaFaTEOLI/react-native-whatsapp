import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';

//https://blog.rocketseat.com.br/gerenciando-formularios-no-react-native/

const Form = props => (
  <View style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.textoTitulo}>WhatsApp Clone</Text>
    </View>
    <View style={styles.form}>
      <TextInput
        style={styles.txtInput}
        value={props.values.email}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder="E-mail"
        underlineColorAndroid={'#adadad'}
      />
      {props.errors.email && (
        <Text style={styles.error}>{props.errors.email}</Text>
      )}

      <TextInput
        style={styles.txtInput}
        value={props.values.senha}
        onChangeText={text => props.setFieldValue('senha', text)}
        placeholder="Senha"
        underlineColorAndroid={'#adadad'}
      />
      {props.errors.email && (
        <Text style={styles.error}>{props.errors.senha}</Text>
      )}
      <TouchableOpacity onPress={() => props.navigation.navigate('Cadastro')}>
        <Text style={styles.textoCadastro}>
          Ainda não tem cadastro? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.form}>
      <TouchableOpacity
        style={styles.botaoLogin}
        onPress={props.handleSubmit}
        title="Login">
        <Text style={styles.txtLogin}>ACESSAR</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    senha: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    senha: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha'),
  }),

  handleSubmit: values => {
    console.log(values);
  },
})(Form);

const styles = StyleSheet.create({
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
