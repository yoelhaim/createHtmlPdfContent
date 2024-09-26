
# PDF Generator with Handlebars and Browser Automation

This project generates customized PDFs from HTML templates using **Handlebars**. It compiles dynamic data into HTML, embeds images, and creates a downloadable PDF with specified formatting, leveraging browser automation for accurate rendering.

## Features

- Dynamic PDF generation from HTML templates
- Image embedding (e.g., logos in Base64 format)
- Customizable PDF format (e.g., margins, page size)
- Browser automation for accurate HTML rendering

## Requirements

- Node.js
- npm
- Handlebars
- A browser (Google Chrome for Selenium or Puppeteer)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yoelhaim/htmlpdfcontent.git
   ```

2. Navigate to the project folder:

   ```bash
   cd htmlpdfcontent
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Prepare your HTML template and data.

2. Import and call the `generatePdf` function:

   ```javascript
   import generatePdf from './src/generatePdf';

   const templateData = { name: "John Doe", title: "PDF Example" };
   const templateSource = `<html><body><h1>{{title}}</h1><p>Hello, {{name}}</p></body></html>`;

   generatePdf(templateData, templateSource)
     .then((result) => {
       console.log("PDF Generated:", result.pdfBuffer);
     })
     .catch((error) => {
       console.error("Error generating PDF:", error);
     });
   ```

3. Start the project:

   ```bash
   node index.js
   ```

## Configuration

- **Template Source**: Handlebars HTML template with placeholders for dynamic data.
- **Image Embedding**: The project reads image files, converts them to Base64, and embeds them directly in the HTML.
- **PDF Options**: You can customize the PDF layout (e.g., page size, margins) within the `generatePdf` function.

## Example

```javascript
const templateData = {
  name: "John Doe",
  title: "Invoice",
  items: [
    { description: "Item 1", price: "$10" },
    { description: "Item 2", price: "$20" }
  ]
};

const templateSource = `
  <html>
  <body>
    <h1>{{title}}</h1>
    <p>Hello, {{name}}</p>
    <ul>
      {{#each items}}
      <li>{{description}} - {{price}}</li>
      {{/each}}
    </ul>
  </body>
  </html>
`;

generatePdf(templateData, templateSource);
```

## Dependencies

- [Handlebars](https://handlebarsjs.com/)
- [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver) or [Puppeteer](https://www.npmjs.com/package/puppeteer)

## License

This project is licensed under the MIT License.
