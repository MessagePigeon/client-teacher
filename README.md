# Message Pigeon Teacher Client

> The frontend of Message Pigeon for teacher & admin teacher

## Preparation

> If you use the mock server, please ignore

1. Start [Backend](https://github.com/MessagePigeon/server)
2. Rename `.env.template` to `.env.local` and configure it

## Installation

```sh
pnpm install
```

## Development

### Teacher

```sh
cd packages/teacher
pnpm run dev
```

### Admin

```sh
cd packages/admin
# Start with mock server
pnpm run dev:mock
# Start with backend
pnpm run dev
```

## Production

```
pnpm run build
```

The distributable files will be generated in `/dist/teacher` and `/dist/admin`
