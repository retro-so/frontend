import firebase from 'firebase/app'
import 'firebase/database'

import './setup'

export const database = firebase.database()

database.useEmulator('localhost', 9000)
