export type Session = {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  uid: string
}

export type MaybeSession = Session | null
