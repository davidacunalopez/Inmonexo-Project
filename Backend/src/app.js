import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/users.routes.js'
import clientsRoutes from './routes/clients.routes.js'
import propertiesRouter from './routes/properties.routes.js'
import eventsRouter from './routes/eventos.routes.js'
import paysRouter from './routes/pagos.routes.js'

const app = express();

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/inmonexo", authRoutes)
app.use("/inmonexo", userRoutes)
app.use("/inmonexo", clientsRoutes)
app.use('/inmonexo', propertiesRouter)
app.use('/inmonexo', eventsRouter)
app.use('/inmonexo', paysRouter);

export default app