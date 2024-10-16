import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id : number;
  citizenship: string;
  locality: string;
  firstName: string; 
  lastName: string;
  section: string;
  lot: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  censusType: string;
  date: string; // Consider using a Date type depending on your date format
  gender: string;
  maritalStatus: string;
  total: string;  
  householdNo: boolean;
  relation: string;
  age: string;

}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

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
     gender TEXT NOT NULL,
     locality TEXT NOT NULL,
     age TEXT NOT NULL,
     section TEXT NOT NULL,
     lot TEXT NOT NULL,
     householdNo TEXT NOT NULL,
     total TEXT NOT NULL,
     maritalStatus TEXT NOT NULL,
     citizenship TEXT NOT NULL, 
     relation TEXT NOT NULL
     );


  `);
};

export const addPerson = async (
  relation: string, 
  citizenship: string, 
  age: string, 
  firstName: string, 
  lastName: string, 
  phone: string,
  email: string, 
  date: string, 
  province: string, 
  censusType: string, 
  district: string, 
  ward: string, 
  locality: string, 
  gender: string, 
  section: string, 
  lot: string, 
  householdNo: string, 
  total: string, 
  maritalStatus: string) => {
  try {
    // Use the 'relation' parameter in the query
    const result = await db.runAsync('INSERT INTO person ( relation, firstName, locality, lastName, citizenship, phone, email, province, district, ward, censusType, date, gender, lot, section, householdNo, total, age, maritalStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', censusType, relation, firstName, lastName, phone, citizenship, email, province, district, ward, date, gender, lot, section, householdNo, age, maritalStatus, locality, total);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (id: number, relation: string, firstName: string, lastName: string, phone: string, email: string, province: string, date: string, censusType: string, district: string, ward: string, locality: string, gender: string, section: string, lot: string, householdNo: string, total: string, age: string, maritalStatus: string, citizenship: string,) => {
  try {
    await db.runAsync('UPDATE person SET firstName = ?, relation = ?, citizenship = ?, lastName = ?, phone = ?, email = ?, province = ?, district = ?, ward = ?, date = ?, locality = ?, gender = ?, censusType = ? , lot = ?, age = ?, section = ?, householdNo = ?, maritalStatus = ? WHERE id = ?', firstName, lastName, phone, email, citizenship, province, district, locality, ward, date,  censusType, lot, section, householdNo, censusType, total, gender, relation, age, maritalStatus, id);
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => { 
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
