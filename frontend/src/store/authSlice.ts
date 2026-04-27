import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { auth, firebaseConfigured } from '@/lib/firebase'

export type AuthUser = {
  uid: string
  email: string | null
  displayName: string | null
}

function mapUser(user: User | null): AuthUser | null {
  if (!user) return null
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  }
}

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.'
    case 'auth/user-disabled':
      return 'This account has been disabled.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.'
    default:
      return 'Sign-in failed. Please try again.'
  }
}

type AuthState = {
  user: AuthUser | null
  initialized: boolean
  busy: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  initialized: false,
  busy: false,
  error: null,
}

let authUnsub: (() => void) | null = null

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  if (!firebaseConfigured || !auth) {
    return rejectWithValue('Sign-in is not configured for this deployment.')
  }
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password)
  } catch (e: unknown) {
    const code =
      typeof e === 'object' && e !== null && 'code' in e
        ? String((e as { code?: string }).code)
        : ''
    return rejectWithValue(mapAuthError(code))
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  if (auth) {
    await signOut(auth)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionSynced(state, action: PayloadAction<{ user: AuthUser | null }>) {
      state.user = action.payload.user
      state.initialized = true
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.busy = true
        state.error = null
      })
      .addCase(login.fulfilled, (state) => {
        state.busy = false
      })
      .addCase(login.rejected, (state, action) => {
        state.busy = false
        state.error = action.payload ?? 'Sign-in failed. Please try again.'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.busy = false
      })
      .addCase(logoutUser.rejected, (state) => {
        state.busy = false
      })
  },
})

export const listenAuthSession = createAsyncThunk(
  'auth/listen',
  async (_, { dispatch }) => {
    if (authUnsub) {
      authUnsub()
      authUnsub = null
    }
    if (!firebaseConfigured || !auth) {
      dispatch(authSlice.actions.sessionSynced({ user: null }))
      return
    }
    authUnsub = onAuthStateChanged(auth, (user) => {
      dispatch(authSlice.actions.sessionSynced({ user: mapUser(user) }))
    })
  }
)

export const { clearError } = authSlice.actions
export default authSlice.reducer
