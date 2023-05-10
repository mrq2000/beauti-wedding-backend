# Backend base
With express + typescript + typeORM

## Steps to run this project:

Create .env file and config your environment variables

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm i
```

Run docker

```bash
  npm run docker
```

Create migrate (run only time)

```bash
  npm run migrate:run
```

Start

```bash
  npm run start
```

## Migrate

Run migrate

```bash
  npm run migrate:run
```

Create migrate

```bash
  npm run migrate:create
```

Rollback

```bash
  npm run migrate:rollback
```

## Eslint

Run eslint

```bash
  npm run eslint
```

Fix possible eslint

```bash
  npm run fix
```
