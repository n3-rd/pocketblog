/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("259f7rmjnjg5qxd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtaejywq",
    "name": "enabled",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("259f7rmjnjg5qxd")

  // remove
  collection.schema.removeField("gtaejywq")

  return dao.saveCollection(collection)
})
