const mongoose = require('./db');
const User = require('./models/User');
const Category = require('./models/Category');
const Project = require('./models/Project');
const bcrypt = require('bcrypt');

async function seed() {
  await User.deleteMany({});
  await Category.deleteMany({});
  await Project.deleteMany({});

  // Create users
  const usersData = [
    { username: 'Abby', password: 'abby123' },
    { username: 'John', password: 'john123' },
    { username: 'Jane', password: 'jane123' },
    { username: 'Mike', password: 'mike123' },
    { username: 'Sara', password: 'sara123' },
    { username: 'Tom', password: 'tom123' },
    { username: 'Linda', password: 'linda123' },
    { username: 'Alex', password: 'alex123' },
    { username: 'Nina', password: 'nina123' },
    { username: 'Sam', password: 'sam123' },
    { username: 'Priya', password: 'priya123' },
  ];
  const userDocs = [];
  for (const u of usersData) {
    const hash = await bcrypt.hash(u.password, 10);
    userDocs.push(await User.create({ username: u.username, password_hash: hash }));
  }

  // Create categories
  const categoriesData = ['Science', 'Technology', 'Math', 'Art', 'Business'];
  const categoryDocs = [];
  for (const name of categoriesData) {
    categoryDocs.push(await Category.create({ name }));
  }

  // Create 100 projects
  const titles = ['Research', 'AI', 'Web App', 'Mobile App', 'Analysis', 'Design', 'Simulation', 'Experiment', 'Survey', 'Review'];
  const projects = [];
  for (let i = 0; i < 100; i++) {
    const title = `${titles[i % titles.length]} Project ${i + 1}`;
    const user = userDocs[i % userDocs.length];
    const category = categoryDocs[i % categoryDocs.length];
    projects.push({
      title,
      user: user._id,
      category: category._id,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    });
  }
  await Project.insertMany(projects);

  console.log('Sample data inserted');
  mongoose.connection.close();
}

seed();
