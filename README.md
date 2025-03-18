# Capstone
## Backend App Setup 

When using the app, make sure to set up your `.env` file with the following configurations:

```
PORT=yourPort
JWT_SECRET='yourSecret'
DB_HOST='yourHost (Most likely localhost)'
DB_USER='yourDBUser'
DB_PASSWORD='yourDBPassword'
DB_DATABASE='yourDBName'
DB_PORT=5432 (or your port, most times it's 5432)
```
Also, make sure your `.env` file is inside of the `src/server/` directory so `db.js` will recognize where it is.

Make sure to replace the placeholder values with the appropriate information for your setup.

Happy coding!