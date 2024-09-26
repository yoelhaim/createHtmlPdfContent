// const express = require("express");

// const handlebars = require("handlebars");
// const createHtmlPdfContent = require("./createHtmlPdfContent.mjs");
import express from "express";
import createHtmlPdfContent from "./createHtmlPdfContent.mjs";

const app = express();
const port = 3099;

app.get("/", async (req, res) => {
  const templateSource = `./file.html`;

  const templateData = {
    items: [
      {
        name: "Product 1",
        quantity: 2,
        price: 100,
      },
      {
        name: "Product 2",
        quantity: 1,
        price: 200,
      },
    ],
    shippingAmount: 100,
    id: 1,
    taxes: 10,
    fullname: "hello everyone",
  };

  const { html, pdf, ...rest } = await createHtmlPdfContent(
    templateData,
    templateSource
  );

  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
