import { Database } from "@nozbe/watermelondb";
import SQLiteDatabase from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from "./schema";
import { User } from './model/User';
import { Car } from './model/Car';

const adapter = new SQLiteDatabase({
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses: [
        User,
        Car
    ],
});