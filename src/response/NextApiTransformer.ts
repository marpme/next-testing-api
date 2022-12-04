/*

The MIT License (MIT)

Copyright (c) 2022 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Original Source: https://github.com/vercel/next.js/blob/992c46e63bef20d7ab7e40131667ed3debaf67de/packages/next/server/api-utils/node.ts
*/

import { NextApiResponse } from "next";
import { Stream } from "stream";

/**
 * Send `JSON` object
 * @param res response object
 * @param jsonBody of data
 */
export const sendJson = <T>(res: NextApiResponse<T>, jsonBody: any): void => {
  // Set header to application/json
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Use send to handle request
  res.send(JSON.stringify(jsonBody) as T);
};

/**
 * Send `any` body to response
 * @param res response object
 * @param body of response
 */
export const sendData = <T>(res: NextApiResponse<T>, body: any): void => {
  if (body === null || body === undefined) {
    res.end();
    return;
  }

  // strip irrelevant headers/body
  if (res.statusCode === 204 || res.statusCode === 304) {
    res.removeHeader("Content-Type");
    res.removeHeader("Content-Length");
    res.removeHeader("Transfer-Encoding");

    if (process.env.NODE_ENV === "development" && body) {
      console.warn(
        `A body was attempted to be set with a 204 statusCode for MOCKED_API_REQUEST, this is invalid and the body was ignored.\n` +
          `See more info here https://nextjs.org/docs/messages/invalid-api-status-body`
      );
    }
    res.end();
    return;
  }

  const contentType = res.getHeader("Content-Type");

  if (body instanceof Stream) {
    throw new Error("Streams are not yet supported!");
  }

  const isJSONLike = ["object", "number", "boolean"].includes(typeof body);
  const stringifiedBody = isJSONLike ? JSON.stringify(body) : body;

  if (Buffer.isBuffer(body)) {
    if (!contentType) {
      res.setHeader("Content-Type", "application/octet-stream");
    }
    res.setHeader("Content-Length", body.length);
    res.end(body);
    return;
  }

  if (isJSONLike) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }

  res.setHeader("Content-Length", Buffer.byteLength(stringifiedBody));
  res.end(stringifiedBody);
};
