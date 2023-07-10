<p>This application is purely written in Javascript (Fullstack) and consists of:</p>
<p>1. The backend (in the db folder) written in nodeJS with its API written in expressJS.</p>
<p>2. The frontend (in the src folder) written in vueJS and some use of jQuery.</p>
<p>NB: The ORM used here is objectionJS</p><br><br>
s
<p>To install the application, cd to the root/main folder (camer) and run this command as root/Administrator:</p>
&emsp;&emsp;- npm install

<p>Tell your server/computer where the application is located by creating the file:</p>
&emsp;&emsp;- /etc/camer/camer-server.conf and provide the absolute path of the application folder: e.g: 
[options]
addons.path = </apsolute/path/of/the/app> (e.g: /opt/camer)

<p>To run the application, run these commands:</p>
&emsp;&emsp;- npm run dev (for the backend)
&emsp;&emsp;- npm run start (for the frontend)

<p>The API can be handled via the curl command. e.g: curl -X POST -H "Content-Type:application/json" http://localhost:3000/api/<className> -d '<json object>'</p><br><br>

<p>Through the browser, one can create a class using: http://localhost:3000/api/<className> and once the class is created, one can use the curl command (curl -X POST -H "Content-Type:application/json" http://localhost:3000/api/<className>) to POST, PUT, GET, and DELETE data or the UI at http://localhost:8080/#/apps to Create, Read, Update and Delete (CRUD) data into the defined class.</p><br><br>

<p>All existing apps are availate at: http://localhost:8080/#/apps</p><br>
