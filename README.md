# ecommerce-pern

After cloning project you need to build postgresql container in `server` folder

```
sudo docker-compose up --build
```

And next time in server folder to **start server** run:

```
sudo docker-compose up
npm run dev
```

Then in `client` folder run:
```
npm run start
```

To connect to Postgresql in VSCode you may use `PostgreSQL (ckolkman)` VSCode plugin. To connect to database with this plugin use `.env` data username, password and etc.

Check `.env` files in `server` and `client` folders
