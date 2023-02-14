# SimpleMusic WEB

SimpleMusic WEB is a [ReactJS](https://reactjs.org/) based web app to interact with the [SimpleMusic API](https://github.com/CastelJeremy/simple-music-api).

## Requirements

This projects requires:
 - [SimpleMusic API](https://github.com/CastelJeremy/simple-music-api)
 - [NodeJS](https://nodejs.org)
 - [webpack](https://webpack.js.org/)

## Installation

1. **Clone the project repository**  
   `git clone https://github.com/CastelJeremy/simple-music-web.git /project/directory`

2. **Run npm install**  
   `npm install`

## Configuration

The only configuration you must do is add the IP or domain name of the SimpleMusic API instance you would like to use. To update the configuration, edit the file in `src/imports/api/requestHandler.js` and replace **host** with your instance's url.

## Running

To start the app with a local server in development mode run the following command :

```
npm run start
```
 
You can also _build_ the app in development mode with :

```
npm run build-dev
```

Finally, the application can be built in production mode :

```
npm run build-prod
```
