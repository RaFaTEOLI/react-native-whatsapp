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

const Form = props => (
  <View style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.textoTitulo}>Cadastro</Text>
    </View>
    <View style={styles.form}>
      <TextInput
        style={styles.txtInput}
        placeholder="Nome"
        value={props.values.nome}
        onChangeText={text => props.setFieldValue('nome', text)}
        underlineColorAndroid={'#adadad'}
      />
      {props.errors.nome && (
        <Text style={styles.error}>{props.errors.nome}</Text>
      )}

      <TextInput
        style={styles.txtInput}
        placeholder="E-mail"
        value={props.values.email}
        onChangeText={text => props.setFieldValue('email', text)}
        underlineColorAndroid={'#adadad'}
      />
      {props.errors.email && (
        <Text style={styles.error}>{props.errors.email}</Text>
      )}

      <TextInput
        style={styles.txtInput}
        placeholder="Senha"
        value={props.values.senha}
        onChangeText={text => props.setFieldValue('senha', text)}
        underlineColorAndroid={'#adadad'}
      />
      {props.errors.senha && (
        <Text style={styles.error}>{props.errors.senha}</Text>
      )}
    </View>
    <View style={styles.formButton}>
      <TouchableOpacity
        style={styles.botaoCadastro}
        onPress={props.handleSubmit}
        title="Cadastrar">
        <Text style={styles.txtCadastro}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  </View>
);
export default withFormik({
  mapPropsToValues: () => ({nome: '', email: '', senha: ''}),

  validationSchema: Yup.object().shape({
    nome: Yup.string().required('Preencha o campo de nome'),
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
    marginBottom: 10,
  },
  textoTitulo: {
    fontSize: 25,
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
