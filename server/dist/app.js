"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const config_1 = __importDefault(require("config"));
const createAppRouter_1 = __importDefault(require("./routes/createAppRouter"));
const cors_1 = __importDefault(require("cors"));
// import AdminJSExpress from '@adminjs/express'
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // const __dirname = path.resolve()
        let corsOptions = {
            origin: config_1.default.get('SERVER_HOST'),
            allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Methods', 'Access-Control-Request-Headers'],
            credentials: true,
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use('*', (0, cors_1.default)(corsOptions));
        app.use(express_1.default.json({
            // extended: true,
            limit: '50mb'
        }));
        // admin panel
        // const admin = new AdminJS({})
        //
        // const adminRouter = AdminJSExpress.buildRouter(admin)
        // app.use(admin.options.rootPath, adminRouter)
        const appRouter = (0, createAppRouter_1.default)();
        app.use('/api', appRouter);
        typeorm_config_1.default.initialize()
            .then(() => {
            console.log('Data Source has been initialized!');
        })
            .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
        if (process.env.NODE_ENV === 'production') {
            console.log('Production mode');
            app.use('/', express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
            app.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'public')));
            app.get('*', (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
            });
        }
        const PORT = config_1.default.get('port') || 5000;
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT} ...`));
    });
}
startServer();
//# sourceMappingURL=app.js.map