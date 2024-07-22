import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? '' : 'http://localhost:8989'

export const socket = io(URL)
