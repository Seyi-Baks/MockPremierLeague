const fs = require('fs');
const mongoose = require('mongoose');
const config = require('dotenv');

//Load env variables
config.config();

//Load models
const Team = require('./models/teams.model');

//Connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files
const teams = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/teams.json`, 'utf-8')
);

//Live league - 5eff407ff24ade17c68f4f63

//Import into db
const importData = async () => {
  try {
    await Team.create(teams);

    console.log('DATA Imported');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Team.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
