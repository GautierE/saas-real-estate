# YanClone

<h1>Overview</h1>


This project aims to reproduce www.yanport.com using Angular. The main goal is to experiment with Angular while creating an application that contains a map feature similar to Yanport.

<h2>Technical Stack</h2>
<b>Technologies I am using for the first time are in bold characters</b>
  <ul>
<b>
  <br/>
<li>Frontend : Angular</li>
<li>Testing : Jasmine & Karma</li>
</b>
<li>Styling : Tailwind CSS</li>
<b>
<li>Auth/Storage : Firebase</li>
</b>
<li>Hosting : Vercel</li>
</ul>

<h2>Backend</h2>
This project is also linked to a backend built with native Java. It serves as the data source for the application, providing real estate data. 
<br/>
<br/>
You can find the code for the backend in the following GitHub repository: https://github.com/GautierE/real-estate-data-api.

<h2>Live Demo</h2>
You can access the live demo of this project at https://yanclone.vercel.app. Feel free to explore the features and functionalities implemented in the application.

<h2>Getting Started</h2>
To run this project locally, follow these steps:
<ol>
  <li>Clone the repository: git clone https://github.com/GautierE/saas-real-estate-clone.git</li>
  <li>Install dependencies: cd yanclone && npm install</li>
  <li>.env file configuration

Please create a `.env` file in the `/environments` folder with the following configuration:

| Variable             | Description                                  |
|----------------------|----------------------------------------------|
| `API_KEY`            | Firebase API key                             |
| `AUTH_DOMAIN`        | Firebase authentication domain                |
| `PROJECT_ID`         | Firebase project ID                          |
| `STORAGE_BUCKET`     | Firebase storage bucket                      |
| `MESSAGING_SENDER_ID`| Firebase messaging sender ID                  |
| `APP_ID`             | Firebase application ID                      |
| `API_URL_PROD`       | Backend URL for production environment       |
| `API_URL_DEV`        | Backend URL for development environment      |
| `MAPS_API_KEY`       | Google Maps API key                           |
</li>
  <li>Start the development server: npm run start</li>
  <li>Open your browser and visit http://localhost:4200 to view the application.</li>
</ol>







<h1>Screenshots</h1>

<ol>
  <li>
    <h2>Main application</h2>
    <ul>
      <li>
        <p>Default view</p>
      
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/5bedb19a-b2e5-43c1-8615-52425f652760)
      </li>
      <li>
        <p>Property detail view</p>
       
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/6980ff19-640a-4b44-8012-160383ff5b7f)
      </li>
      <li>
        <p>Edit property view</p>
       
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/136a7ff3-744d-4ee7-9a5c-00bb344826ef)
      </li>
          <li>
            <p>Create property view</p>
            
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/65d9e2c0-64ea-4478-91f9-8019a7a7022b)
          </li>
    </ul>
  </li>
 <li>
    <h2>Authentication</h2>
    <ul>
      <li>
        <p>Login page</p>
        
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/144c900c-d172-4fe5-a769-012b8cb0cc20)
      </li>
      <li>
        <p>Sign up page</p>
        
  ![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/d8bf6f65-c782-4bf2-827e-a598be604528)
      </li>
      <li>
        <p>Contact form</p>
![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/44711680-a8c4-4f21-99ce-35321124296e)
      </li>
    </ul>
  </li>
  <li>
    <h2>Landing page</h2>

![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/60fe10ed-a741-4de6-96c4-a708a8dff99c)
![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/a44df94c-49af-4018-9bc0-6badb1e508bf)
![image](https://github.com/GautierE/saas-real-estate-clone/assets/58479942/d0502e40-6fa9-44f3-8901-59824a954c29)
  </li>
</ol>
