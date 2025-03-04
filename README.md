<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

## Run in dev

1. Clone the repo
2. Run

```
yarn install
```

3. Have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Set-up database

```
docker-compose up -d
```

5. Config env files clonning the `.env.template` and renaming it to `.env`

6. Run app in dev mode

```
yarn start:dev
```

7. Populate database running the endpoint `http://localhost:${PORT}/api/seed` and unzip the content of the file `products.zip` inside the `static/products` folder in the root of the project.

8. Access the static content throught the endpoint

```
http://localhost:${PORT}/api/files/product/${image-name-with-extension}
```

## Stack used

- Postgres
- Nest
