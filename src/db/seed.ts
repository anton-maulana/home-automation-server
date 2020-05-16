import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname + '../../../.env') });

import { Room } from '../models/Room';
const courses: object[] = require('./courses.json');


// Course.sync({ force: true })
//   .then(() => Lesson.sync({ force: true }))
//   .then(() => console.log('Database cleaned'))
//   .then(() => Course.bulkCreate(courses, { include: [{ model: Lesson, as: 'lessons' }] }))
//   .then(() => {
//     console.log('############# seeding completed #################');
//     process.exit();
//   })
//   .catch(console.error);

Room.sync({ force: true })
  .then(() => console.log('Database cleaned'))
  .then(() => {
    console.log('############# seeding completed #################');
    process.exit();
  })
  .catch(console.error);
