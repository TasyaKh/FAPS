import express from 'express'
import path from 'path'

import AppDataSource from "./typeorm.config";
import  config from "config";
import createAppRouter from './routes/createAppRouter'

// import AdminJSExpress from '@adminjs/express'

async function startServer() {
    const app = express()
// const __dirname = path.resolve()

    app.use(express.json({
        // extended: true,
        limit: '50mb'
    }))

    // admin panel
    // const admin = new AdminJS({})
    //
    // const adminRouter = AdminJSExpress.buildRouter(admin)
    // app.use(admin.options.rootPath, adminRouter)

    const appRouter = createAppRouter();
    app.use('/api', appRouter);

    AppDataSource.initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
        })
        .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });


    if (process.env.NODE_ENV === 'production') {
        console.log('Production mode')
        app.use('/', express.static(path.join(__dirname, 'client', 'build')))
        app.use(express.static(path.join(__dirname, 'client', 'public')));

        app.get('*', (req:any, res:any) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
    }

    const PORT = config.get('port') || 5000

    app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`))

}

startServer();
