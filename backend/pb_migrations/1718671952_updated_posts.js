/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtwlxlwp",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 160,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtwlxlwp",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 50,
      "max": 160,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
