import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import Welcome from './components/BoasVindas';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import TabBarMenu from './components/TabBarMenu';
import Contatos from './components/Contatos';
import Conversa from './components/Conversa';

const Stack = createStackNavigator();

export default props => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={FormLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cadastro"
        component={FormCadastro}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#115E54'},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Principal"
        component={Principal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdicionarContato"
        component={AdicionarContato}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#115E54'},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Conversa"
        component={Conversa}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#115E54'},
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
