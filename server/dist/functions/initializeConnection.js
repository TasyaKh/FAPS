"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConnection = void 0;
const mysql_1 = __importDefault(require("mysql"));
const initializeConnection = (config) => {
    const addDisconnectHandler = (connection) => {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");
                    (0, exports.initializeConnection)(connection.config);
                }
                else if (error.fatal) {
                    throw error;
                }
            }
        });
    };
    const connection = mysql_1.default.createConnection(config);
    addDisconnectHandler(connection);
    connection.connect();
    return connection;
};
exports.initializeConnection = initializeConnection;
//# sourceMappingURL=initializeConnection.js.map