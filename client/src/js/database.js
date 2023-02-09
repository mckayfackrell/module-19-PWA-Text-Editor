import { openDB } from "idb";

const initdb = async () =>
  // We are creating a new database named 'jate' which will be using version 1 of the database.
  openDB("jate", 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
};

export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll(1);

  // Get confirmation of the request.
  const result = await request;
  return result?.value;
};

initdb();
