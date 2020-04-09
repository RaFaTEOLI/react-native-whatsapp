import * as yup from 'yup';
import {Formik} from 'formik';
import React, {Fragment, Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {modificarContatoEmail, adicionarContato} from '../actions/AppActions';

class AdicionarContato extends Component {
  renderBtn(handleSubmit, isValid) {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <TouchableOpacity style={styles.botaoAdicionar} onPress={handleSubmit}>
          <Text style={styles.txtAdicionar}>ADICIONAR</Text>
        </TouchableOpacity>
      );
    }
  }
  render() {
    return (
      <Formik
        initialValues={{
          email: this.props.email,
        }}
        onSubmit={values => {
          setDispatcher(this.props, values);
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Digite um e-mail válido')
            .required('Preencha o campo de e-mail'),
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
            <View style={styles.top}>
              {!this.props.adicionar_cadastro_sucesso && (
                <View style={styles.viewButton}>
                  <View style={styles.top}>
                    <TextInput
                      placeholder="E-mail"
                      value={values.email}
                      style={styles.txtEmail}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      underlineColorAndroid={'#adadad'}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <Text style={styles.error}>
                      {this.props.adicionar_cadastro_erro}
                    </Text>
                  </View>
                  <View style={styles.viewButton}>
                    {this.renderBtn(handleSubmit, isValid)}
                  </View>
                </View>
              )}
              {this.props.adicionar_cadastro_sucesso && (
                <View style={styles.viewButton}>
                  <Text style={{fontSize: 20}}>
                    Cadastro Realizado com Sucesso!
                  </Text>
                </View>
              )}
            </View>
          </Fragment>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  txtEmail: {
    fontSize: 20,
    height: 45,
  },
  viewButton: {
    flex: 1,
  },
  botaoAdicionar: {
    backgroundColor: '#115E54',
    padding: 10,
    alignItems: 'center',
  },
  txtAdicionar: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  email: state.AppReducer.adicionar_contato_email,
  adicionar_cadastro_erro: state.AppReducer.adicionar_cadastro_erro,
  adicionar_cadastro_sucesso: state.AppReducer.adicionar_cadastro_sucesso,
});

const setDispatcher = (props, values) => {
  props.adicionarContato(values.email);
};

export default connect(
  mapStateToProps,
  {
    modificarContatoEmail,
    adicionarContato,
  },
)(AdicionarContato);
