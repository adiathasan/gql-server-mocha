import mongoose from 'mongoose';

import { dbConnect } from './config/db';
import { Student } from './schema/students';

dbConnect();

console.log('started');
