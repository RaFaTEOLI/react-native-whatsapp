import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {conversasUsuarioFetch} from '../actions/AppActions';

function GoToButton({screenName, conversas}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenName, {
          contatoNome: conversas.nome,
          contatoEmail: conversas.email,
        });
      }}>
      <View style={styles.main}>
        <Text style={styles.txtNome}>{conversas.nome}</Text>
      </View>
    </TouchableOpacity>
  );
}

class Conversas extends Component {
  constructor(props) {
    super(props);

    this.props.conversasUsuarioFetch();
    this.criarFonteDeDados(this.props.conversas);
  }
  componentDidUpdate(prevProps) {
    if (this.props.conversas !== prevProps.conversas) {
      this.criarFonteDeDados(this.props.conversas);
    }
  }
  criarFonteDeDados(conversas) {
    this.dataSource = conversas;
  }
  renderRow(item) {
    return <GoToButton screenName="Conversa" conversas={item} />;
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
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return {...val, uid};
  });
  return {conversas};
};

export default connect(
  mapStateToProps,
  {conversasUsuarioFetch},
)(Conversas);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
  txtNome: {
    fontSize: 25,
  },
});
