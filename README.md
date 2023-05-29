## todo

-
bugfix: `12:08:07 ERR [Request] [tid:d7dd1425], padlocal grpc request failed: 1, error: Error: 2 UNKNOWN: [tid:d7dd1425] wechat bad request error`

## Manual

### config

#### enable web

- config `PUPPET_USE_WECHAT4U = false` in `./src/settings.ts`.
- config `PUPPET_USE_PADLOCAL = false` in `./src/settings.ts`.

#### enable wechat4u

- config `PUPPET_USE_WECHAT4U = true` in `./src/settings.ts`.
- config `PUPPET_USE_PADLOCAL = false` in `./src/settings.ts`.

#### enable padlocal

- config `PUPPET_USE_WECHAT4U = false` in `./src/settings.ts`.
- config `PUPPET_USE_PADLOCAL = true` in `./src/settings.ts`.
- config the TOKEN in `.env` (following the `.env.sample`).

### init

```shell
sudo npm i -g yarn ts-node

yarn
```

### running

```shell
ts-node ./src/demo.ts
```
