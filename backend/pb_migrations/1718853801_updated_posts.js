/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // remove
  collection.schema.removeField("rtpz8j7f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvzxu2li",
    "name": "keywords",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rtpz8j7f",
    "name": "keywords",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("nvzxu2li")

  return dao.saveCollection(collection)
})
