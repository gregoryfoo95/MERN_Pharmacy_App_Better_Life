
# **_Better Life_**
Before we embark on the journey through a **_Better Life_**, let us introduce to you our group members for General Assembly's Software Engineering Immersive (SEI) Project 3!

## Group Members
FAIZAL!
SUFFIAN!
JARED!
GREG!

A round of applause!

# **Project Background**

**_Better Life_** is a project that manifested with the sweet design of AJA's UX Design project. The wireframe and user features were comprehensively designed and surveyed before it was presented to the budding developers of General Assembly's SEI course. We are extremely honoured to be given the chance to produce a rendition of an application that seeks to improve the applications available in the pharmaceutical industry.

# **Project Description**
This project involves elements of Create-Read-Update-Delete (CRUD) to store medicine information and stock inventory management as a Pharmacist, whilst providing a map interface for Consumers to identify the stores closest to them for the medicine which they are searching for. This allowed our group to dabble with different libraries involving Leaflet, Formik, Yup, Axios, Mapbox and many more!

# **Timeframe**
7 Working Days


# **Deployment** 
This app is deployed on <a href="https://better-life.cyclic.app">Cyclic</a>

Consumer Login - { email: greg@gmail.com, password:123 }

Pharmacist Login - { email: greg@hotmail.com, password: 123 }

A development Trello-styled whiteboard for the planning phase can be found <a href="https://github.com/users/gregoryfoo95/projects/2">here</a>.

# **Technologies Utilized**

- HTML
- Javascript (Node.js)
- CSS (Bootstrap)
- React.js (Frontend)
- Express (Backend)
- Bcrypt for Hashing
- JSON Web Token (JWT) for Authentication (Token)
- Mongoose Validation & Joi for Back-end Validation
- Formik and Yup for Form Validation
- Leaflet and Mapbox for Map Interface
- MongoDB (Database)
- Git for Version Control
- Window Powershell for Command Line Prompt


# **Wireframe Sketch & User Story**
## Wireframe Sketch

<img src = "https://github.com/gregoryfoo95/MERN_Pharmacy_App_Better_Life/blob/main/images/README/Wireframe.jpg?raw=true" width="600" height="600">

## Users' Stories

| As a ...  | I want ...  | Feature | Status
| :-------- |:------------|:---------|:---------
| User | to login/register/logout | Authentication (Security)/POST Request | Done
| User | to have a form to fill in registration/login details | Registration/Login Form (Security)/POST Request | Done
| User | to see medicine products extracted from backend database for sale on the online store | GET Request through Stripe API | Not completed
| Pharmacist | to see/add/edit/delete medicine stored within the database of the company | POST/PUT/DELETE Requests | Done
| Pharmacist | to search for a specific medicine to update details | GET Request | Done
| Pharmacist | to edit stock quantity on the available medicines stored within the database of the company | PUT Requests | Done
| Pharmacist | to see the stock quantity of a deleted medicine to be automatically deleted from the inventory | DELETE Request | Done
| Pharmacist | to see a dashboard of sales analytics |GET Request | Not completed
| Developer | to have authentication and authorisation for accessing specific pages | Authorisation & Authentication | Done
| Developer | to have validation on View, Model and Controller | Input Validation to prevent noSQL/SQL Injections | Done
| Developer | to have unit testing with Mocha and Chai | Ease of Troubleshooting | Not completed
# **Development Timeline and Approach**

| Achievables | Duration |
| :--- | :----------- |
| Planning of Feature between two users (Pharmacist & Consumer) + Database Design | 2 days
| CRUD Functionalities for Pharmacist & Map Functionalities for Consumer | 2 days
| Order Cart Feature (Incomplete) | 1 day
| Login Authentication | 1 day
| Client-side and Server Validation | 1 day

## **Model:**
Using the Model-View-Controller approach, the model in this CRUD app exists in the form of a database. The database employed is MongoDB, which is NoSQL in nature. The Entity-Relationship-Diagram (ERD) is shown below for clarity.

### _Entity Relationship Diagram (ERD)_
<img src = "https://github.com/gregoryfoo95/MERN_Pharmacy_App_Better_Life/blob/main/images/README/ERD_Pharmacy.png?raw=true" width="600" height="600" title="ERD">

There are 4 major schemas in this model: (1) User, (2) Medicine, (3) Location and (4) Stock. For **User**, it contains registration profile information of the user, in which _email_ and a hashed (BCrypt) password would be utilised for subsequent login. It contains feature-significant fields such as _role_, _store_ and _available_, which allows the app to distinguish between a Pharmacist/Consumer, the location of the Pharmacist as well as the pharmacist's availability respectively. For **Medicine**, it is essentially a database of medicines and consists of key information for both Consumers and Pharmacists, such as brand, name, type, country of manufacture, route of administration, strength, price and expiry date. For **Location**, it is a schema used to defined different stores' details, encompassing its name, address, dispensing hours, geolocation (latitude and longitude) and corresponding Pharmacists who are currently at that store. Finally, for **Stock**, it consists of referenced ObjectIds of **Medicine** and **Location**, essentially allowing the inventory management system of the pharmacy to allocate stock quantity to the specific medicine and store location.

| Relationships | Type |
| :--- | :----------- |
| User - Location | Many to One
| Location - Stock | One to Many
| Stock - Medicine | Many to One

### User Schema
```js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const Joi = require('joi');
const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    validate: {
        validator: function (value) {
            const schema = Joi.string().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid name. It must be a valid string.`,
    }
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
        validator: function (value) {
            const schema = Joi.string().email().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid email. It must be a valid email with ...@example.com.`,
    }
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
    validate: {
        validator: function(value) {
          const schema = Joi.string().min(3).required();
          const { error } = schema.validate(value);
          return error ? false : true;
        },
        message: props => `${props.value} is not a valid password! A minimum of 3 characters are required!`,
    }
  },
  role: { 
      type: String,
      trim: true,
      default: "Consumer",
      required: true,
      validate: {
        validator: function(value) {
          const schema = Joi.string().required();
          const { error } = schema.validate(value);
          return error ? false : true;
        },
        message: props => `${props.value} is not a valid role term!`,
      }
    },
  dateAdded: {
      type: Date,
      validate: {
            validator: function(value) {
            const schema = Joi.date();
            const { error } = schema.validate(value);
            return error ? false : true;
            },
            message: props => `${props.value} is not a valid date format!`
      },
  },

  contact: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
            const schema = Joi.string();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid contact number. It must be a valid string.`,
      }
  },
  store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
  },
  available: {
      type: "Boolean",
      default: true,
      validate: {
        validator: function (value) {
            const schema = Joi.boolean().required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) => 
            `${props.value} is not a valid selection for availability. It must be either true or false.`,
      }
  }
},
{ 
    timestamps: true,

    toJSON: {
        transform: function(doc, ret) {
        delete ret.password;
        return ret;
        }
    }
});

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
```
### Medicine Schema
```js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require('joi');

const medicineSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid brand name. It must be a valid string.`,
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine name. It must be a valid string.`,
        }
    },

    type: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine type. It must be a valid string.`,
        }
    },

    country: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid country name. It must be a valid string.`,
        }
    },

    routeOfAdmin: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid route of administration term. It must be a valid string.`,
        }
    },

    strength: {
        type: String,
        default: "0",
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const schema = Joi.string().required();
                const { error } = schema.validate(value);
                return error ? false : true;
            },
            message: (props) => 
                `${props.value} is not a valid medicine strength. It must be a valid string.`,
        }
    },

    price: {
        type: Number,
        default: 0,
        required: true,
        validate: {
        validator: function (value) {
            const schema = Joi.number().min(0).required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) =>
            `${props.value} is not a valid price amount. Must be greater than or equals to 0.`,
        },
    },

    expiry_date: {
        type: Date,
        default: Date.now(),
        required: true,
        validate: {
            validator: function(value) {
            const schema = Joi.date().min(Date.now()).required();
            const { error } = schema.validate(value);
            return error ? false : true;
            },
            message: props => `${props.value} is not a valid date format!`
        },
        
    }
},

{
    timestamps: true,
},
)
module.exports = mongoose.model("Medicine", medicineSchema);
```
### Location Schema
```js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const locationSchema = new Schema({
    storeName: {
        type: String,
        required: true,
        trim: true,
    },

    storeAddress: {
        type: String,
        required: true,
    },

    dispensingHours: {
        type: String,
        required: true,
    },

    latitude: {
        type: Number,
        required:true,
    },

    longitude: {
        type: Number,
        required:true,
    },
    
    users: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    }
    

},
{
    timestamps: true,
},
);

locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model("Location", locationSchema);

```
### Stock Schema
```js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const stockSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        require: true,
    },
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },

    quantity: {
        type: Number,
        default: 0,
        required: true,
        validate: {
        validator: function (value) {
            const schema = Joi.number().min(0).required();
            const { error } = schema.validate(value);
            return error ? false : true;
        },
        message: (props) =>
            `${props.value} is not a valid quantity. Must be greater than or equals to 0.`,
        },
    },

},
{
    timestamps: true,
},
)
module.exports = mongoose.model("Stock", stockSchema);
```
## **View:**
The **View** is primarily built using React.js. Client-side request and Server-side response (Express) are established to allow required data to be queried from the database and sent to the webpage. The wonders of React.js allows useState. useEffect, useNavigate hooks to allow re-rendering of data on the webpage without an actual HTML page refresh, achieving a Single-Page-App (SPA) concept.

Specifically for the Medicine and Stock forms, they are validated through the use of Formik and Yup libraries, which allow form creation and form validation.

**Summary of View pages:**
| Path | Purpose    
|:--------|:-------|
| / | Authentication Page (Login/Register/Forgot Password)
| /medicine | Medicine Database
| /api/medicine/data | Seed Medicine Database with data.gov.sg API
| /api/medicine/:id | GET/PUT/DELETE Request to Medicine Model
| /stock | Stock Inventory
| /api/stock/createseed | Seed Stock Database with existing Medicine data
| /api/stock/:id |DELETE Request to Stock Model
| /api/:id/updatestock | PUT Request to Stock Model
| /api/user/login | POST Request to User Model for Login
| /api/user/forgotpassword | POST Request to User Model for Forgot Password
| /api/user/:id | PUT/GET Request to User Model

## **Controller:**
The **Controller** consists of various controllers utilised to handle requests orinated from user interactions with the **View**. It processes the requests and performs queries to the database to locate specific data, which subsequently gets returned to the **View** through a response by the controller.

The server is validated for user requests through the usage of _Mongoose Validation methods_ and _Joi_. Mongoose is a MongoDB object modeller and handler for a Node.js environment and Mongoose Validation is essentially a middleware that is defined within the SchemaType of a Mongoose schema. This will be automatically triggered before a document is saved in MongoDB. Separately, the controllers are also programmed to reject certain conditions in the requests that it encounters, which acts as an additional layer of defence.

| Controllers|Functionality   
| :-------|:-------------------|
| userController | _create_, _login_, _resetPassword_, _changePassword_, _forgotPassword_, _updateUserById_, _getUserById_
| medicineController | _create_, _getAll_, _show_, _updateById_, _deleteById_, _data_
| stockController | _seedStockShell_, _getAllStock_, _updateStockById_, _createStock_, _deleteStockById_

# **Key Takeaways**

- Working in a team with git version control
- Planning of react components is fundamental to prevent scrambles to extract components out of codes midway
- Always do deployment first at the start to make sure it works! A single line of code that was untraceable led to a wild goose chase for deployment!

# **Future Works**
- Order Cart to extract information from Medicine Database
- Order History to be saved for sales analytics
- Dashboard to perform data analysis on medicine sales in different stores

