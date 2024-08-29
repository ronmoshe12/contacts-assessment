This repository contains a full-stack Contacts Management Application with offline support and synchronization capabilities. The front end is built using Angular, and the back end is a simple Express.js server.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Angular CLI](https://angular.io/cli) (version 14.x or higher)
- [http-server](https://www.npmjs.com/package/http-server) for serving the production build

 **1.Clone the Repository**

`   git clone [https://github.com/your-username/your-repository-name.git](https://github.com/ronmoshe12/contacts-assessment.git
   cd contacts-assessment`
   
   **2.Install dependencies for the client: **
  `cd client`
  `npm install`
  
  **3. Install dependencies for the server: **
  `cd ../server`
  `npm install`
  
  **4. Running the Client (Angular) **
  `cd client`
  `ng serve`
  Open your browser and navigate to http://localhost:4200/.
The application will automatically reload if you change any of the source files.

**5. Running the Server (Express.js) **
    `cd server`
    `node index.js`
    The server will start running on http://localhost:3000.
  
  
 ** Building for Production**
 `cd client`
`ng build --configuration=production`
This command will create a dist/ directory inside the client folder containing the production build.

**Testing Service Worker and Offline Capabilities**
Service Workers are only enabled in production mode. To test the Service Worker and offline capabilities:

**Build the Angular application:**

`cd client
`ng build --configuration=production`
`Serve the production build using http-server:``

**Install http-server globally if you haven't already:**

Copy code
npm install -g http-server
Then, serve the application:

`cd dist/client`
`http-server -p 8080`

Open your browser and navigate to http://localhost:8080.

**Simulate Offline Mode:**

Open Chrome DevTools (F12).
Go to the "Application" tab and check if the Service Worker is active.
Switch to the "Network" tab and set the network conditions to "Offline."
Test the application's offline capabilities by navigating through different pages and performing CRUD operations.


