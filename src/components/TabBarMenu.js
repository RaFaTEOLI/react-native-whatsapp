import React from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabBar} from 'react-native-tab-view';
import AddContato from '../img/add_contato.png';
import {habilitarInclusaoContato} from '../actions/AppActions';
import {connect} from 'react-redux';

function GoToButton({screenName}, props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AdicionarContato');
        props.habilitarInclusaoContato();
      }}>
      <Image source={AddContato} />
    </TouchableOpacity>
  );
}

function Logout({screenName}, props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        firebase
          .auth()
          .signOut()
          .then(() => navigation.navigate('Login'))
      }>
      <Text style={styles.txtSair}>Sair</Text>
    </TouchableOpacity>
  );
}

const TabBarMenu = props => {
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#114D44" />

      <View style={styles.topMenu}>
        <View style={styles.topBar}>
          <Text style={styles.txtTopBar}>WhatsApp Clone</Text>
        </View>

        <View style={styles.middleMenu}>
          <View style={styles.imageAdd}>
            {GoToButton('AdicionarContato', props)}
          </View>
          <View style={styles.txtBar}>{Logout('Login', props)}</View>
        </View>
      </View>

      <TabBar {...props} style={styles.mainTabBar} />
    </View>
  );
};

export default connect(
  null,
  {habilitarInclusaoContato},
)(TabBarMenu);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#115E54',
    elevation: 4,
    marginBottom: 6,
  },
  topBar: {
    height: 50,
    justifyContent: 'center',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleMenu: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  imageAdd: {
    width: 50,
    justifyContent: 'center',
  },
  txtSair: {
    fontSize: 20,
    color: '#FFF',
  },
  txtBar: {
    justifyContent: 'center',
  },
  txtTopBar: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 20,
  },
  mainTabBar: {
    backgroundColor: '#115E54',
    elevation: 0,
  },
});
