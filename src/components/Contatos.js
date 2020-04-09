import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {contatosUsuariosFetch} from '../actions/AppActions';

function GoToButton({screenName, contatos}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenName, {
          contatoNome: contatos.nome,
          contatoEmail: contatos.email,
        });
      }}>
      <View style={styles.itemContato}>
        <Text style={styles.itemNome}>{contatos.nome}</Text>
        <Text style={styles.itemEmail}>{contatos.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

class Contatos extends Component {
  constructor(props) {
    super(props);

    this.props.contatosUsuariosFetch();
    this.criaFonteDeDados(this.props.contatos);
  }
  componentDidUpdate(prevProps) {
    if (this.props.contatos !== prevProps.contatos) {
      this.criaFonteDeDados(this.props.contatos);
    }
  }
  criaFonteDeDados(contatos) {
    this.dataSource = contatos;
  }
  renderRow(item) {
    return <GoToButton screenName="Conversa" contatos={item} />;
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.dataSource}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={item => item.uid}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
    return {...val, uid};
  });
  return {contatos};
};

export default connect(
  mapStateToProps,
  {contatosUsuariosFetch},
)(Contatos);

const styles = StyleSheet.create({
  itemContato: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
  itemNome: {
    fontSize: 21,
  },
  itemEmail: {
    fontSize: 14,
  },
});
