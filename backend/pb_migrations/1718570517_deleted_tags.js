/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iz6olblyxmvmb8q");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "iz6olblyxmvmb8q",
    "created": "2024-06-16 20:41:34.338Z",
    "updated": "2024-06-16 20:41:34.338Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8qxrvgc3",
        "name": "name",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "323d88eoe3yyk72",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
