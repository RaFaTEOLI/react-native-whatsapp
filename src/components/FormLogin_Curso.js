import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default props => (
  <View style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.textoTitulo}>WhatsApp Clone</Text>
    </View>
    <View style={styles.form}>
      <TextInput style={styles.txtInput} placeholder="E-mail" />
      <TextInput style={styles.txtInput} placeholder="Senha" />
      <Text>Ainda não tem cadastro? Cadastre-se</Text>
    </View>
    <View style={styles.form}>
      <Button title="Acessar" onPress={() => false} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
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
    flex: 2,
    backgroundColor: 'black',
  },
  txtInput: {
    fontSize: 20,
    height: 45,
  },
});

