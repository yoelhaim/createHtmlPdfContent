import { Builder, By, until } from "selenium-webdriver";
import handlebars from "handlebars";
import path from "path";
import fs from "fs/promises";
import chrome from "selenium-webdriver/chrome.js"; // Add .js extension

import pdf from "html-pdf";

const generatePdfWithSelenium = async (templateData, fileSource) => {
  try {
    const data = templateData;
    if (!fileSource) {
      return { error: "Invalid file source" };
    }
    const resvfile = fileSource.split("").reverse().join("").split(".")[0];
    if (resvfile.split("").reverse().join("") !== "html") {
      return { error: "Invalid file format" };
    }

    const templatePath = path.join(process.cwd(), fileSource);

    const templateSource = await fs.readFile(templatePath, "utf-8");

    // Chrome Options (use headless if needed, here headless is set to false)
    const options = new chrome.Options();
    // options.setChromeBinaryPath(
    //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    // );
    options.addArguments("--no-sandbox", "--disable-setuid-sandbox");

    // Launch the browser with Selenium
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    try {
      const content = templateSource;

      // Compile Handlebars template
      const template = handlebars.compile(content);
      const result = template(data);

      // Convert logo to Base64
      const logoPath = path.join(process.cwd(), "./logo.png");
      const logoData = await fs.readFile(logoPath);
      const logoBase64 = logoData.toString("base64");
      const logoDataUrl = `data:image/png;base64,${logoBase64}`;

      // Replace logo placeholder in HTML
      const htmlContentWithDataUrl = result.replace(
        'src="logo.png"',
        `src="${logoDataUrl}"`
      );

      await driver.get(
        "data:text/html;charset=utf-8," +
          encodeURIComponent(htmlContentWithDataUrl)
      );

      await driver.wait(until.elementLocated(By.tagName("body")), 10000);

      await driver.quit();
      const genpdf = await pdf.create(htmlContentWithDataUrl, {
        format: "A4",
        printBackground: true,
        margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
      });
      const buff = await new Promise((resolve, reject) => {
        genpdf.toBuffer((err, buff) => {
          if (err) {
            return reject(err);
          }
          resolve(buff);
        });
      });

      return { html: htmlContentWithDataUrl, pdf: buff };
    } catch (error) {
      console.error("Error in the browser interaction", error);
      await driver.quit();
      return { error };
    }
  } catch (error) {
    console.error("Error generating PDF", error);
    return { error };
  }
};

export default generatePdfWithSelenium;
