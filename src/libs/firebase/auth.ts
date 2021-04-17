import firebase from 'firebase/app'
import 'firebase/auth'

import './setup'

export const auth = firebase.auth()

export type Provider = 'google' | 'anonymous'

export async function signIn(provider: Provider) {
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

  switch (provider) {
    case 'google':
      return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    case 'anonymous':
      return auth.signInAnonymously()
    default:
      throw new Error('Unexpected provider: ' + provider)
  }
}

auth.useEmulator('http://localhost:9099')
