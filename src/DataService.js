import firebase from "./firebase";

const db_setlist = firebase.ref("/setlist");

export const DataService = {
  fetchItems: async () => {
    const items = [];
    await db_setlist.once('value', snapshot => {
      snapshot.forEach(function (childSnapshot) {
        const id = childSnapshot.key;
        const { title, description, index, files } = childSnapshot.val();
        items.push({ id, title, description, index, fileName: files[0] })
      });
    })
    return items
  },
  addItem: async ({ item }) => {
    const { title, description, index, fileName } = item
    const response = await db_setlist.push({ title, description, index, files: [fileName] });
    return response.key
  }
}

export default DataService