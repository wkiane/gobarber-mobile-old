import {Alert} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '~/services/api';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions', {email, password});

    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no Login',
        'Usuário não pode ser prestador de serviços 😐',
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro na autenticação, verifique seus dados. 😐',
    );
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro cadastro, verifique seus dados. 😐',
    );
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  // caso o usuário não tenha nada salvo
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
