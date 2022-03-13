import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

{
  console.log('PUT data to database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

   // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: id, jate: content });
  
  // Get confirmation of the request.
  const result = await request;
  console.log('data saved to the jateDB', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET data from database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

   // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};


initdb();
