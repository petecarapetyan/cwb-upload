import { createModel } from '@captaincodeman/rdx'
import { State } from '../store'
import { createSelector } from 'reselect'
import { authLoader } from '../firebase'

export type User = import('firebase').UserInfo

export interface AuthState {
  user: User | null
  statusKnown: boolean
}

export default createModel({
  state: <AuthState>{
    user: null,
    statusKnown: false,
  },

  reducers: {
    signedIn(state, user: User) {
      // this shouldn't be here but for now...
      for (var i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if(key && key.startsWith("page")){
          const item = localStorage.getItem(key)
          if(!item?.startsWith("/README")){
            console.log(user.displayName + " might want to buy" + item );
          }
        }
      }
      return { ...state, user, statusKnown: true }
    },

    signedOut(state) {
      return { ...state, user: null, statusKnown: true }
    },
  },

  effects() {
    return {
      async signout() {
        const auth = await authLoader
        await auth.signOut()
      },

      async signinProvider(name: string) {
        const auth = await authLoader
        const provider = providerFromName(name)
        await auth.signInWithRedirect(provider)
      },
    }
  }
})

function providerFromName(name: string) {
  switch (name) {
    case 'google': return new window.firebase.auth.GoogleAuthProvider();
    // TODO: add whatever firebase auth providers are supported by the app
    // case 'facebook': return new window.firebase.auth.FacebookAuthProvider();
    // case 'twitter': return new window.firebase.auth.TwitterAuthProvider();
    default: throw `unknown provider ${name}`
  }
}

const getState = (state: State) => state.auth

export namespace AuthSelectors {
  export const user = createSelector(
    [getState],
    (state) => state.user
  )

  export const statusKnown = createSelector(
    [getState],
    (state) => state.statusKnown
  )

  export const anonymous = createSelector(
    [user],
    (user) => user === null
  )

  export const authenticated = createSelector(
    [user],
    (user) => user !== null
  )
}
