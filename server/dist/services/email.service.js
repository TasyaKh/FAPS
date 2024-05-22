"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const config_1 = __importDefault(require("config"));
const nodemailer = __importStar(require("nodemailer"));
class EmailService {
    constructor() {
        this.HOST = config_1.default.get('SERVER_HOST');
        this.FROM_EMAIL = config_1.default.get('DEFAULT_FROM_EMAIL') || '';
        this.NODE_ENV = config_1.default.get('NODE_ENV') || 'development';
    }
    sendPasswordResetEmail(to, token, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = 'Сбросить пароль';
            const url = `${(this.HOST)}/auth/reset-password/${token}`;
            const htmlEmailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сброс пароля</title>
        </head>
        <body>
            <h2>Сбросить пароль</h2>
            <p>Привет,</p>
            <p>Вы запросили сброс пароля. Нажмите кнопку ниже, чтобы это сделать:</p>
            <p><a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Сбросить пароль</a></p>
            <p>Если вы этого не запрашивали, проигнорируйте сообщение.</p>
            <p>You have received this email because a request to reset your password was made.</p>
        </body>
        </html>
    `;
            return yield this.sendMail(to, subject, htmlEmailContent);
        });
    }
    // to -which email we nedd to send, subject - some title, html - message
    sendMail(to, subject, html) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const port = (_a = config_1.default.get("SMTP_PORT")) !== null && _a !== void 0 ? _a : 465;
            const transporter = nodemailer.createTransport({
                // service: "gmail",
                host: config_1.default.get("SMTP_DOMAIN"),
                port: port,
                secure: port == 465,
                auth: {
                    user: config_1.default.get("SMTP_USERNAME"),
                    pass: config_1.default.get("SMTP_PASSWORD"),
                },
            });
            const message = {
                from: `"faps" <${this.FROM_EMAIL}>`,
                to,
                subject,
                html,
            };
            /* if development environment, log the content of email instead of sending actual emails */
            if (this.NODE_ENV === 'development') {
                console.log('Captured email');
                console.log('to: ', to);
                console.log('Subject: ', subject);
                console.log('content: ', html);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const previewEmail = require('preview-email');
                previewEmail(message).then(console.log).catch(console.error);
            }
            else {
                const info = yield transporter.sendMail(message);
                console.log('Message sent: %s', info, " envelope ", info.envelope, " response ", info.response);
            }
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=email.service.js.map