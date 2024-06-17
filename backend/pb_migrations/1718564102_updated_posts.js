/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsm2rvxc",
    "name": "published",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // remove
  collection.schema.removeField("gsm2rvxc")

  return dao.saveCollection(collection)
})
