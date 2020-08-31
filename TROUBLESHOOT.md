### Troubleshooting
```Error: listen EADDRINUSE 0.0.0.0:3000```

It seems port '3000' was already in use in your environment.

You can choose either one of the following solution:

1. Kill the instance which uses port 3000 and run npm run serve again.
In order to find which process uses port 3000, type lsof -i :3000 in your terminal.
Then kill it by its pid.

2. Run http server with another port.
Make sure your current directory is root playground directory before executing the command below.

```node node_modules/http-server/bin/http-server -p <port number you like to use> dist/```

For example, in case you want to run server with port 3100:
```node node_modules/http-server/bin/http-server -p 3100 dist/```

#### If you find a case that is not described in this document, please let us know