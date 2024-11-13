import app from './app.js'
import { PORT } from './config.js'

//APP escuchando en el puerto establecido
app.listen(process.env.PORT || PORT)
console.log("Serve on port ", process.env.PORT || PORT)