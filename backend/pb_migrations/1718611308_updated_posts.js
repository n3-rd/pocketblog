/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("323d88eoe3yyk72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvl0dmpj",
    "name": "content",
    "type": "text",
    "required": true,
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

  // remove
  collection.schema.removeField("jvl0dmpj")

  return dao.saveCollection(collection)
})
