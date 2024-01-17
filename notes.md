 "server": "cd server && npm start", 
"client": "npm start --prefix client" both do the same

## How to serve react with node?
Build creates static files just serve it's index.html

// package.json
"build": "BUILD_PATH=../server/fe-build react-scripts build",
"deploy": "npm run build --prefix client && npm run runOnce --prefix server"

// app.js
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "fe-build", "index.html"))
})

# Maps
maps are the objects that preserve order

## Launches MVC
Architecture - features like, models usually make sense to be separate from routes and controllers

## Handle client side routing
-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
 just an * it is so easy