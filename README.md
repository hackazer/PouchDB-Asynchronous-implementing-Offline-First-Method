PouchDB-Asynchronous implementing Offline First Method

how to :
1. install pouchdb, pouchdb-server, pouchdb-find, body-parser using npm. \n
(npm install pouchdb pouchdb-server pouchdb-find body-parser)n \n
2. Run index.js, open.your localhost:3000\n
3. You can either try to login first / create the user via register page\n
4. Restart node, and reopen index.js / just reopen localhost:3000\n
5. try to login, you'll be able to login now using the local database (offline mode)\n
6. run the remote database pouchdb-server ( pouchdb-server --port 3333)\n
7. you'll see the login details being synchronized to the remote database.\n
8. Access localhost:3333/_utils, and see your newly synchronized data there\n