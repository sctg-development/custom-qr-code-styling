# Custom QR Code Styling

Generate modern, styled, and branded QR codes for free! Built with React, based on the [QR Code Styling](https://github.com/kozakdenys/qr-code-styling) JS library and [Custom QR Code Styling](https://github.com/awran5/custom-qr-code-styling).

<hr />

<p align="center">
  <img width="1417" alt="Capture d’écran 2025-05-04 à 13 04 46" src="https://github.com/user-attachments/assets/09799571-6ebd-4b67-92a7-056faa879514" />
</p>

## Features

- Modern and stylish QR code generation
- Customizable designs
- Easy to use interface
- Free and open-source

## TL;DR

You can use Docker for running `custom-qr-code-styling` 

```bash
docker run -p 8888:80 sctg/admb-qr-code:latest
```

Next, open your browser and visit `http://localhost:8888`


## Live Demo

Check out the live demo: [QR Code Generator](https://qr.lesailesdumontblanc.com/)

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sctg-development/custom-qr-code-styling
   cd custom-qr-code-styling
   ```

2. Install dependencies:

   ```bash
   # Using npm
   npm install

   # Or using Yarn
   yarn
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and visit `http://localhost:3000`

## Docker

A docker image is available for this project. It is tagged as `sctg/admb-qr-code:v.......` where `.......` is the version release version without dots nor dashes. 

## Customization

To customize the QR code generator:

1. Open the `src/configuration.ts` file.
2. Edit the configuration object as desired.
3. Save the file.
4. Rebuild the project:

   ```bash
   npm run build
   # or
   yarn build
   ```

## Deployment

You can deploy this QR code generator for free using Cloudflare Pages or Azure Static Web Apps.

### Cloudflare Pages

1. Create a free [Cloudflare account](https://www.cloudflare.com/).
2. Log in to your Cloudflare dashboard.
3. Go to "Pages" and click "Create a project".
4. Choose "Connect to Git" and select your GitHub repository.
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `build`
6. Click "Save and Deploy".

### Azure Static Web Apps

1. Create a free [Azure account](https://azure.microsoft.com/).
2. Log in to the [Azure Portal](https://portal.azure.com/).
3. Click "Create a resource" and search for "Static Web App".
4. Click "Create" and fill in the required details.
5. In "Build Details":
   - Select "React" as the build preset
   - App location: `/`
   - API location: `api`
   - Output location: `build`
6. Click "Review + create" and then "Create".
7. Connect to your GitHub repository in the deployment center.

Both platforms offer continuous deployment, automatically rebuilding and redeploying when you push changes to your main branch.

### Prebuilt QR Code Generator

You can also use the prebuilt QR code generator by downloading the latest release and hosting it on any static web hosting service.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [QR Code Styling](https://github.com/kozakdenys/qr-code-styling) for the core QR code generation library
- [Custom QR Code Styling](https://github.com/awran5/custom-qr-code-styling) for inspiration and initial implementation

## Support

If you find this project helpful, please give it a star on GitHub!
