export default class EmailService {
    private readonly HOST;
    private readonly FROM_EMAIL;
    private readonly NODE_ENV;
    constructor();
    sendPasswordResetEmail(to: string, token: string, firstName?: string): Promise<void>;
    private sendMail;
}
