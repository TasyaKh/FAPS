export class UserDto {
    id?: number
    email?: string
    password?: string
    role_name?: string
    forgot_password_token?: string

//     additional
    search?: string
    limit?:number = 5
    offset?:number = 0
}
