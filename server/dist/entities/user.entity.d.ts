import { ConditionsLocality } from "./conditions_locality.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    session: string;
    role_name: string;
    forgot_password_token: string;
    conditions_locality: ConditionsLocality;
}
