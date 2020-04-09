import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import {
  modificarMensagem,
  enviarMensagem,
  conversaUsuarioFetch,
} from '../actions/AppActions';

import imgSend from '../img/enviar_mensagem.png';

class Conversa extends Component {
  constructor(props) {
    super(props);

    this.props.conversaUsuarioFetch(this.props.route.params.contatoEmail);
    this.criarFonteDeDados(this.props.conversa);
  }
  componentDidUpdate(prevProps) {
    if (this.props.conversa !== prevProps.conversa) {
      //this.props.conversaUsuarioFetch(this.props.route.params.contatoEmail); //crash
      this.criarFonteDeDados(this.props.conversa);
    }
  }
  criarFonteDeDados(conversa) {
    this.dataSource = conversa;
  }
  renderRow(item) {
    if (item.tipo === 'e') {
      return (
        <View style={styles.rightMessage}>
          <Text style={styles.rightText}>{item.mensagem}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.leftMessage}>
          <Text style={styles.leftText}>{item.mensagem}</Text>
        </View>
      );
    }
  }
  _enviarMensagem() {
    const mensagem = this.props.mensagem;
    const {contatoNome, contatoEmail} = this.props.route.params;
    this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }
  render() {
    this.props.navigation.setOptions({
      title: this.props.route.params.contatoNome,
    });
    return (
      <View style={styles.main}>
        <View style={styles.chatView}>
          <FlatList
            data={this.dataSource}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={item => item.uid}
          />
        </View>

        <View style={styles.messageView}>
          <TextInput
            style={styles.txtInput}
            value={this.props.mensagem}
            placeholder="Digite sua mensagem..."
            onChangeText={text => this.props.modificarMensagem(text)}
          />
          <TouchableOpacity
            onPress={this._enviarMensagem.bind(this)}
            underlayColor="#FFF">
            <Image source={imgSend} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return {...val, uid};
  });
  return {
    conversa,
    mensagem: state.AppReducer.mensagem,
  };
};

export default connect(
  mapStateToProps,
  {
    modificarMensagem,
    enviarMensagem,
    conversaUsuarioFetch,
  },
)(Conversa);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EEE4DC',
    padding: 10,
  },
  chatView: {
    flex: 1,
    paddingBottom: 20,
  },
  messageView: {
    flexDirection: 'row',
    height: 60,
  },
  txtInput: {
    flex: 4,
    backgroundColor: '#FFF',
    fontSize: 18,
  },
  rightMessage: {
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
  },
  rightText: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    backgroundColor: '#dbf5b4',
    elevation: 1,
  },
  leftMessage: {
    alignItems: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 40,
  },
  leftText: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    backgroundColor: '#f7f7f7',
    elevation: 1,
  },
});
