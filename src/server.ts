// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment from './config/Environments';
import compression from 'compression';

const port = Environment.port;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(compression());

//Initialize security settings
server.use(helmet());
server.use(
    cors({
        origin: '*',
    })
);

server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

//Routing
import { router as authRouter } from './routes/AuthenticationRoutes';
server.use('/api/auth', authRouter);