import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
     id: number; 
     firstName: string; 
     lastName: string;
      phone: string; 
      email: string;
      province: string; 
      censusType: string;
      district: string; 
      ward: string;
      date: string; // Consider using a Date type depending on your date format 
    gender: string; 
}

export const initializeDB = async () => { 
    await db.execAsync
    (` PRAGMA journal_mode = WAL; 

    ALTER TABLE person ADD COLUMN gender TEXT NOT NULL; 

   DROP TABLE IF EXISTS person;


    CREATE TABLE IF NOT EXISTS person
    ( id INTEGER PRIMARY KEY NOT NULL, 
     firstName TEXT NOT NULL, 
     lastName TEXT NOT NULL, 
     phone TEXT NOT NULL,
     email TEXT NOT NULL,
     province TEXT NOT NULL, 
     district TEXT NOT NULL, 
     ward TEXT NOT NULL,
     date TEXT NOT NULL, 
     censusType TEXT NOT NULL,
     gender TEXT NOT NULL );

        CREATE TABLE IF NOT EXISTS person 
        ( id INTEGER PRIMARY KEY NOT NULL, 
         firstName TEXT NOT NULL, 
         lastName TEXT NOT NULL, 
         phone TEXT NOT NULL,
         email TEXT NOT NULL,
         province TEXT NOT NULL, 
         district TEXT NOT NULL, 
         ward TEXT NOT NULL,
         date TEXT NOT NULL, 
         censusType TEXT NOT NULL,
         gender TEXT NOT NULL ); 

         ALTER TABLE person ADD COLUMN gender TEXT NOT NULL;
         `);

                 };

         export const addPerson = async (
            firstName: string,
             lastName: string, 
             phone: string,
             email: string,
             province: string, 
             date: string,
             censusType: string,     
             gender: string) => 
            { try { const result = await db.runAsync('INSERT INTO person (firstName, lastName, phone, email, province, date, census Type, locality, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
             firstName, lastName, phone, email, date, gender); 
             return result.lastInsertRowId;  
            } catch (error) { console.error("Error adding person:", error);

             } 
            };       

                            export const getPersons = async () => { 
                                try { const allRows = await db.getAllAsync
                                    ('SELECT * FROM person') as Person[];
                                     return allRows; } catch (error) 
                                     { console.error("Error getting persons:", error); 
                                        return []; 
                                    } 
                                };                            