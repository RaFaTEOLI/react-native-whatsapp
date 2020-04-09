import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

// import imagemFundo from '../img/welcome.jpg';
import imagemFundo from '../img/bg.png';
import logo from '../img/logo.png';

export default props => (
  <ImageBackground style={styles.imagem} source={imagemFundo}>
    <View style={styles.topo}>
      <View style={styles.f2}>
        <Text style={styles.txtBemVindo}>Seja Bem-vindo!</Text>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.f1}>
        <TouchableOpacity
          style={styles.botaoLogin}
          onPress={() => props.navigation.navigate('Login')}
          title="Fazer Login">
          <Text style={styles.txtLogin}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    width: null,
  },
  topo: {
    flex: 1,
    padding: 15,
  },
  txtLogin: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  txtBemVindo: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  botaoLogin: {
    backgroundColor: '#115E54',
    padding: 10,
    alignItems: 'center',
  },
  f1: {
    flex: 1,
  },
  f2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
