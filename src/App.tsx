import { FC, useEffect, useState } from 'react'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import { Textarea } from '@yandex/ui/Textarea/desktop/bundle'
import { UserInfo, auth, googleAuthProvider, database } from './firebase'
import './App.css'

export const App: FC = () => {
  const [value, setValue] = useState('')

  const onLogin = async () => {
    await auth.setPersistence('local')
    await auth.signInWithPopup(googleAuthProvider)
  }

  const onLogout = async () => {
    await auth.signOut()
  }

  const session = useSession()
  const onNewEntry = async () => {
    // const uid = Date.now()
    await database.ref('cards/1').set({ content: value, creator: session?.displayName })
    setValue('')
  }

  useBoard()

  return (
    <div className="App">
      {session && <div>Hello, {session.displayName}</div>}
      <Button view="default" size="m" onClick={onLogin}>
        Login
      </Button>
      <Button view="default" size="m" onClick={onLogout}>
        Logout
      </Button>
      <div>
        <Textarea
          view="default"
          size="m"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button view="default" size="m" onClick={onNewEntry}>
          Add new entry
        </Button>
      </div>
    </div>
  )
}

function useSession() {
  const [session, setSession] = useState<UserInfo | null>(null)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => setSession(user))
  }, [])

  return session
}

function useBoard() {
  useEffect(() => {
    const ref = database.ref('cards/1')
    ref.on('value', (snap) => {
      console.log('>>> snap', snap.val())
    })
  }, [])
}
