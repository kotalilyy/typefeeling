# for api

```
npm install -g vercel

cd api
touch .env
```

### the .env file needs values for these fields

```
PROD_URL=
DEV_URL=
```

### next steps

```
yarn
yarn generate:prisma
vercel dev --listen 4000`
```

url: http://localhost:4000/api

Shoutout to @[rsbear](https://github.com/rsbear)
