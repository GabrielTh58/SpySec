import { CoreFacade } from 'adapters'
import FirestoreProvider from './db/FirestoreProvider'
import FirebaseAuthProvider from './auth/FirebaseAuthProvider'

const core = new CoreFacade(new FirestoreProvider(), new FirebaseAuthProvider())
export { core }
