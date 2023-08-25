# Mongodb Model 

Model is very simple yet very powerful tool for interacting with
mongodb database and making internal or external API calls. Under the hood model is a wrapper for the 
nodejs mongodb driver. It also extracts away the complexities commonly encountered in NodeJs Mongodb
driver or Mongoose.js. It is also a duplex stream, specifically a Transform stream. It uses
full power of the Nodejs mongodb driver and of the NodeJs Transform Stream API. In other words, everything you can do with mongodb NodeJs driver and NodeJs Transform API you can do with model! Model is primarily very highly event driven. It is also compatible with mongoose.js.

### Installation

```bash
$ yarn add @mongodb-model/model

```
 or 

```bash

$ npm i @mongodb-model/model

```

### Simple Usage Examples

#### Basic Event base CRUD

```javascript
const Model = require('@mongodb-model/model');
const User = new Model({collection: 'users'});
    
// query (create query)
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};
User.create(userData);

// Listen for the 'create' event because model emitted 'create' event when the 'create' (User.create(userData)) method was called and successully created a new user with the userData.
User.on('create', user => console.log('new user created', user));

// Listen for the 'create-error' event because model emitted 'create-error' event when the 'create' (User.create(userData)) method was called and failed to create a new user with the userData.
User.on('create-error', error => console.log('new user creation error', error));
 
```

#### Making api request (http request)
```javascript
 const Model = require('@mongodb-model/model');
 const model = new Model();
 model.apiGet(); //model.apiGet(your api endpoint)
 model.on('apiGet', data => console.log(data));
 model.on('apiGet-error', error => console.error(error));
 
```

#### By extension

```javascript
 class MyWonderfulClass extends require('@mongodb-model/model') {

    constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    this.autobind(MyWonderfulClass);
    this.autoinvoker(MyWonderfulClass);
    this.setMaxListeners(Infinity);
  }
 };
 
```
#### Detailed explanation with first contructor parameter object
```javascript
 const Model = require('@mongodb-model/model');
                
// Usage 
const YourCustomModel = new Model({db: 'your_database_name', collection: 'your_collection_name', url: 'your_database_url'})
                
// No constructor Parameter provided: 
 const User = new Model;
// Default collection is 'users'
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
                
// Constructor first parameter object with only collection key
const User = new Model({collection: 'users'});
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
                
// Connecting to multiple databases
const BlogUser = new Model({db: 'blog', collection: 'users'})
const WorkChat = new Model({db: 'work', collection: 'chats'})
const ForumUser = new Model({db: 'forum', collection: 'users'})

// query (create query using ForumUser)
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};
ForumUser.create(userData);

ForumUser.on('create', user => console.log('new user created', user));
ForumUser.on('create-error', error => console.log('new user creation error', error));
 
```

#### Detailed explanation with all other contructor parameter objects
```javascript
const Model = require('@mongodb-model/model');
  
const User = new Model({},{title: 'Cool Users', age: 25, fullName: () => 'User Full Name', Post: class Post {}});

// The User model now has the following added to its prototype and they are bounded to it: title,age, fullName, post
// So now we can do things like the following: 
            
const title = User.title 
const age = User.age 
const fullname = User.fullName();
const FirstPost = new User.Post 
            
// Or using object destructuring 
const {title, age, fullName, Post} = User
 
```

#### Event base CRUD
```javascript
const Model = require('@mongodb-model/model');
const User = new Model({collection: 'users'});

// Read (reall all)
User.all();
User.on('all', users => console.log('all users', users));
User.on('all-error', error => console.log('error in getting all users', error));

// Create
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};

User.create(userData);
User.on('create', user => console.log('new user created', user));
User.on('create-error', error => console.log('new user creation error', error));

// find, takes exact same parametters as the pure mongodb find method.
User.find({_id: '633050cf3a5f6ed0d6c482e7'});
User.on('find', user => console.log('found user', user));
User.on('find-error', error => console.log('error in finding user', error));

// update, takes exact same parametters as the pure mongodb updateOne method.
User.update({_id: '633050cf3a5f6ed0d6c482e7'},{firstname: 'New First Name'});
User.on('update', user => console.log('updated user', user));
User.on('update-error', error => console.log('error in updating user', error));

// delete, takes exact same parametters as the pure mongodb deleteOne method.
User.delete({_id: '633050cf3a5f6ed0d6c482e7'});
User.on('delete', user => console.log('deleted user', user));
User.on('delete-error', error => console.log('error in deleting user', error));
 
```

#### Promise base CRUD
```javascript
const Model = require('@mongodb-model/model');
const User = new Model({collection: 'users'});

// Read (reall all) : this way of querying can be done with all "awaitMethods" on the model. 
const action = User.awaitAll()

// option 1:
action
.then(users => console.log('all users', users))
.catch(error => console.log('finding all users eror', error));

// option 2
User.on('all', users => console.log('all user', users))
User.on('all-error', error => console.log('Error getting all users', error))

// option 3
User.on('awaitAll', users => console.log('all users', users))
User.on('awaitAll-error', error => console.log('Error getting all users', error))

// Create
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};

User.awaitCreate(userData)
.then(user => console.log('new user created', user));
.catch(error => console.log('new user creation error', error));

// awaitFind, takes exact same parametters as the pure mongodb find method.
User.awaitFind({_id: '633050cf3a5f6ed0d6c482e7'})
.then(user => console.log('found user', user));
.catch(error => console.log('error in finding user', error));

// awaitUpdate, takes exact same parametters as the pure mongodb updateOne method.
User.awaitUpdate({_id: '633050cf3a5f6ed0d6c482e7'},{firstname: 'New First Name'})
.then( user => console.log('updated user', user));
.catch(error => console.log('error in updating user', error));

// awaitDelete, takes exact same parametters as the pure mongodb deleteOne method.
User.awaitDelete({_id: '633050cf3a5f6ed0d6c482e7'});
.then( user => console.log('deleted user', user));
.catch(error => console.log('error in deleting user', error));
 
```

#### CLI example
```bash
model make:model User
```

#### Some available instance methods 
```javascript

const DB = require('@mongodb-model/model');
const db = new DB();

// The following functions are available on db, the DB instance, as methods.
// The majority of them, especially the ones with name very similar to the Mongodb native driver methods, are actually the corresponding 
// mongodb native driver methods. In other words, they take the exact same arguments as the corresponding  native mongodb driver methods

createCollection(collectionName = 'users');
dropCollection(collectionName = 'users');
insertOne(data = {}, collectionName = 'users');
create(data = {}, collectionName = 'users');
insertMany(data = [], collectionName = 'users');
createMany(data = [], collectionName = 'users');
findOne(query = {}, collectionName = 'users');
first(query = {}, collectionName = 'users');
find(query = {}, projection = {}, collectionName = 'users');
all(query = {}, projection = {}, collectionName = 'users');
sort(query = {},sort = {},projection = {},collectionName = 'users');
deleteOne(query = {}, collectionName = 'users');
deleteMany(query = {}, collectionName = 'users');
dropCollection(collectionName = 'collectionName', dbName = 'dbName');
collectionDrop(dbName = 'dbName', collectionName = 'collectionName');
updateOne(query = {}, data = {}, collectionName = 'users');
update(query = {}, data = {}, collectionName = 'users');
updateMany(query = {}, data = {}, collectionName = 'users');
limit(query = {},limit = 1,projection = {},collectionName = 'users');
letfJoin(collectionOne = "users", collectionTwo = "contacts", localField = "_id", foreignField = "user_id", as = "usersContacts");
findById(id, collectionName = 'users');
findByEmail(email, collectionName = 'users');
firstByEmail(email, collectionName = 'users'); 
firstByUsername(username, collectionName = 'users');
firstByPhone(phone, collectionName = 'users');
firstByFirstName(firstname, collectionName = 'users');
firstByLastName(lastname, collectionName = 'users');
findByQuery(query = {}, projection = {}, collectionName = 'users');
firstByQuery(query = {}, collectionName = 'users');
firstByToken(token, collectionName = 'users')

awaitCeateCollection(collectionName = 'users');
awaitDropCollection(collectionName = 'users');
awaitInsertOne(data = {}, collectionName = 'users');
awaitCreate(data = {}, collectionName = 'users');
awaitInsertMany(data = [], collectionName = 'users');
awaitCreateMany(data = [], collectionName = 'users');
awaitFindOne(query = {}, collectionName = 'users');
awaitFirst(query = {}, collectionName = 'users');
awaitFind(query = {}, projection = {}, collectionName = 'users');
awaitAll(query = {}, projection = {}, collectionName = 'users');
awaitSort(query = {},sort = {},projection = {},collectionName = 'users');
awaitDeleteOne(query = {}, collectionName = 'users');
awaitDeleteMany(query = {}, collectionName = 'users');
awaitDropCollection(collectionName = 'collectionName', dbName = 'dbName');
awaitCollectionDrop(dbName = 'dbName', collectionName = 'collectionName');
awaitUpdateOne(query = {}, data = {}, collectionName = 'users');
awaitUpdate(query = {}, data = {}, collectionName = 'users');
awaitUpdateMany(query = {}, data = {}, collectionName = 'users');
awaitLimit(query = {},limit = 1,projection = {},collectionName = 'users');
awaitLetfJoin(collectionOne = "users", collectionTwo = "contacts", localField = "_id", foreignField = "user_id", as = "usersContacts");
awaitFindById(id, collectionName = 'users');
awaitFindByEmail(email, collectionName = 'users');
awaitFirstByEmail(email, collectionName = 'users'); 
awaitFirstByUsername(username, collectionName = 'users');
awaitFirstByPhone(phone, collectionName = 'users');
awaitFirstByFirstName(firstname, collectionName = 'users');
awaitFirstByLastName(lastname, collectionName = 'users');
awaitFindByQuery(query = {}, projection = {}, collectionName = 'users');
awaitFirstByQuery(query = {}, collectionName = 'users');
awaitFirstByToken(token, collectionName = 'users')
```
#### Basic Model Structure
```javascript
'use strict';

const Model = require('@mongodb-model/model');

/*
|--------------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------------
|
| User extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/

                                                        
class User extends Model{
                                                        
    /*
    |----------------------------------------------------------------------------------
    |                                   constructor
    |----------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    | options: default model options: any other option  for the model.
    |
    |
    */

    constructor(dbOptions = {collection: 'users', url: 'mongodb://localhost:27017', db: 'my_app'},...options){
                                                           
    /*
    |-------------------------------------------------------------------------------------
    |                                       super
    |-------------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    |
    |
    */
                                                        
    super(dbOptions);
                                                        
    /*
    |--------------------------------------------------------------------------------------
    | default database options: in case dbOptions is set but collection and url 
    | keys on the dbOptions are not provided.
    |--------------------------------------------------------------------------------------
    |
    */
                                                        
    if(!this['hasOwnProperty']['collection']) this.collection = 'users';
    if(!this['hasOwnProperty']['url']) this.url = 'mongodb://localhost:27017';
                                                        
    /*
    |---------------------------------------------------------------------------------------
    |                                      model options
    |---------------------------------------------------------------------------------------
    | Any other optional options passed to the model.
    |
    */
    
    options.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach(key => {
                if(!this[key]) this[key] = option[key];
            })
        }
    })}
                                                        
    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */
                                                        
                                                        
    /**
    * @name sayHello
    * @function
    *
    * @param {Object|String} toMyProject Project name or project object.
    *
    * @description says hello to my project
    *
    * @return does not return anything
    *
    */
                                                        
    async sayHello(toMyProject) {
        console.log('Hello there', toMyProject, '! I understand you are the new wonderful kid in the neighborhood!');
    }
                                                        
}
                                                        
                                                        
/*
|-----------------------------------------------------------------------------------------------
|                                       exports model 
|-----------------------------------------------------------------------------------------------
|
*/

module.exports = User;
```
#### CLI screenshot (terminal)

![cli](https://www.mongodb-model.com/frontend/img/cli/cli.png "Model CLI")

#### Official Website
[https://www.mongodb-model.com](https://www.mongodb-model.com)

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

