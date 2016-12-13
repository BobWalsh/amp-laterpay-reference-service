# AMP/LaterPay reference service

This project started out as a demo/prototype of an integration between AMP and LaterPay.

It is now a reference service implementation used during development of said integration,
which can also potentially be used locally by anyone working on integrating LaterPay into
their AMP pages.


## Running it locally

This prototype uses a very simple demo server written in Node.js to provide
some mock responses with the necessary headers and expected redirection patterns.

Make sure you have a recent Node.js (stable or LTS) and then:

```
npm install
npm run dev
```

## Testing it out with a local AMP page

You can make use of the additional `configUrl` parameter to specify this server
instead. That parameter will only work if you are running a local development
version of AMP.

```
  <script id="amp-access" type="application/json">
    {
      "vendor": "laterpay",
      "laterpay": {
        "configUrl": "http://localhost:8080",
        "articleTitleSelector": ".content-container > header > h1"
      }
    }
  </script>
```
