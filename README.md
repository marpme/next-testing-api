<div align="center">
<img alt="logo" src="./logo.svg">
</div>

---

![npm (tag)](https://img.shields.io/npm/v/@next-testing/api/latest)
![NPM](https://img.shields.io/npm/l/@next-testing/api)
![npm](https://img.shields.io/npm/dt/@next-testing/api)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=marpme_next-testing&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=marpme_next-testing)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=marpme_next-testing&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=marpme_next-testing)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=marpme_next-testing&metric=coverage)](https://sonarcloud.io/summary/new_code?id=marpme_next-testing)


Simplifying the struggle of mocking and reimplementing NextAPIRequests and NextAPIResponses
in order to test and validate NextJS serverless functions.

# Installation

Choose your favorite package manager to install the next-testing library

#### NPM

```shell
npm install --save-dev @next-testing/api
```

#### Yarn

```sh
yarn add -D @next-testing/api
```

#### PNPM

```sh
pnpm add -D @next-testing/api
```

# Usage

### Mocking Simple `GET` Request

```ts
import ServerlessFunctionApi from './pages/api/v1/myApi'
import { NextApiRequestBuilder, ResponseMock } from '@next-testing/api'

test("Get Request and Response Mock", () => {
  const req = new NextApiRequestBuilder().setMethod('GET').build()
  const res = ResponseMock<MyResult>()

  ServerlessFunctionApi(req, res)

  expect(res.getStatusCode()).toEqual(405)
  expect(res.getBodyJson()).toStrictEqual({
      success: false,
      message: 'Method not allowed',
  })
})
```

### Mocking Simple `POST` Request

```ts
import ServerlessFunctionApi from './pages/api/v1/myApi'
import { NextApiRequestBuilder, ResponseMock } from '@next-testing/api'

it('Post Request and Response Mock', async () => {
    const req = new NextApiRequestBuilder().setMethod('POST').build()
    const res = ResponseMock<MyResult>()

    ServerlessFunctionApi(req, res)

    expect(res.getStatusCode()).toEqual(401)
    expect(res.getBodyJson()).toStrictEqual({
        success: false,
        message: 'access denied',
    })
})
```

### Mocking Request with Headers

```ts
import ServerlessFunctionApi from './pages/api/v1/myApi'
import { NextApiRequestBuilder, ResponseMock } from '@next-testing/api'

it('Mock Request and Response with headers', async () => {
  const req = new NextApiRequestBuilder()
          .setMethod('POST')
          .setHeaders({ authorization: 'Bearer ABC123' })
          .build()
  const res = ResponseMock<CronResult>()

  ServerlessFunctionApi(req, res)

  expect(res.getStatusCode()).toEqual(401)
  expect(res.getBodyJson()).toStrictEqual({
      success: false,
      message: 'access denied',
  })
})
```

### Mocking Request with Headers, Body & Cookies

```ts
import ServerlessFunctionApi from './pages/api/v1/myApi'
import { NextApiRequestBuilder, ResponseMock } from '@next-testing/api'

it('Mock Request and Response with headers', async () => {
  const req = new NextApiRequestBuilder()
          .setMethod('POST')
          .setHeaders({ authorization: 'Bearer ABC123' })
          .setCookies({ apiKey: "mytoken" })
          .setBody({
              posts: [{
                  content: "hello world"
              }]
          })
          .build()
  const res = ResponseMock<CronResult>()

  ServerlessFunctionApi(req, res)

  expect(res.getStatusCode()).toEqual(401)
  expect(res.getBodyJson()).toStrictEqual({
      success: false,
      message: 'access denied',
  })
})
```

### Mocking Request with route parameters

If your handler depends on some parameters found in the path, eg. it's defined
in `pages/api/[foo]/echo`, then you can specify it with `setQuery()`.

```ts
import EchoHandler from './pages/api/[foo]/echo'
import { NextApiRequestBuilder, ResponseMock } from '@next-testing/api'

it('Mock Request and Response with route parameters', async () => {
  const req = new NextApiRequestBuilder()
          .setMethod('GET')
          .setQuery({
            foo: 'hello'
          })
          .build()
  const res = ResponseMock()

  EchoHandler(req, res)

  expect(res.getStatusCode()).toEqual(200)
  expect(res.getBodyJson()).toStrictEqual({
      foo: 'hello',
  })
})
```
