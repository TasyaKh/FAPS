
### Ошибки

#### При запуске npm run start

Если у вас свежая версия nodejs (_Node.js v18.12.1_): 
> error:0308010C:digital envelope routines::unsupported

> The «error:0308010C:digital envelope routines::unsupported» occurs because Node.js v17 and later use OpenSSL v3.0 which has had breaking changes. To resolve the error, set the NODE_OPTIONS environment variable to —openssl-legacy-provider when running your development server.

Решение: в cmd написать C:\Windows\System32>set NODE_OPTIONS=--openssl-legacy-provider
Перезапустить среду разработки (_VSCode_)
