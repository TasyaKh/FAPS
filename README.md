
-
### Клиент (_Windows_)
-
#### Ошибка при запуске npm run start в папке \client

Если у вас свежая версия nodejs (_Node.js v18.12.1_): 
> error:0308010C:digital envelope routines::unsupported

> The «error:0308010C:digital envelope routines::unsupported» occurs because Node.js v17 and later use OpenSSL v3.0 which has had breaking changes. To resolve the error, set the NODE_OPTIONS environment variable to —openssl-legacy-provider when running your development server.

**Решение:**
 написать в package.json в папке \client
    "start": "react-scripts --openssl-legacy-provider start"

-
### Сервер (Windows)
-
#### локальная разработка

на серверной части в package.json перейти на локальную разработку на своем ПК NODE_ENV=_default_
    "start": "cross-env NODE_ENV=default node app.js",

#### Ошибка при npm run start на сервере
> ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

**Решение:** 
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server 

Execute the following query in MYSQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

flush privileges;

Try connecting using node after you do so.

If that doesn't work, try it without @'localhost' part.

-
### MYSQL
-
на официальном сайте скачать **MySQL Workbench 8.0** и **MySQL Installer** (чтобы быстро скачать и настроить сервер для запуска БД)

#### MySQL Workbench
MySQL80 должет быть в состоиянии "выполняется" в службах на ПК, все настройки подключения посмотреть в MySQL Installer к этому серверу


#### (ПОКА НЕ РАБОТАЕТ) pm2 библиотека
-
Библиотека для автоперезапуска сервера
* Unix:
    npm uninstall pm2 -g
* Windows:
    npm install pm2-windows-startup -g


