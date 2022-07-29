![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=Mark+Savka)

#### How to work with my API

##### Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

## Click on image got open my repos

[![N|Solid](https://pm1.narvii.com/8308/1005bb319abcf8fe005881a6edf8a176d2264e1er1-736-736v2_00.jpg)](https://github.com/MarkSavkaIt/kit-test-api)

Go on with Ukraine
Що мені не подобається в проекті

- впринципі все
- не зроблений адекватно .env
- багато де розставлені консол-логи та закоментований код який потрібно прибрати
- для роботи з помилками краще окремий модуль, але тут все на місці вирішується
- не найкраще розбиття на роутери (наприклад те що юзер та лікар реєструються під різними роутерами, і на них двох одна схема/модель я б виділив їх в окремі таблиці)
- десь можуть бути пропущені якісь middleware тому що тестував сам і тести максимаьлно примітивні
- подекуди накидано багато страшного коду який можна зробити щоб легше читався, але на це потрібен час
- також кілька @ts-ignore на проекті щоб швидко скіпнути якусь помилку
- ще якось можна було скоротити кількість middleware в ендпоінтах, зробивши окремий ендпоінт або об'єднавши декілька middleware в один в тих місцях де вони часто повторяються
- ✨Magic ✨

# How is it work ?

### Register/login

- use localhost:3000/auth/register/user for create user and auth/register/doctor for create doctor
- please do emply POST query on this route. You will get intresting message
- do normal query and get token
- you need to paste token in "x-access-token" headers
- you can use /auth/login for generate new token

### Appointments

- use GET /appointments for get all appointments for token-user
- use GET /appointments/doctor to see all { free: true } doctors
- use POST /appointments for rent a doctor
- use GET /approve to see all appoi
