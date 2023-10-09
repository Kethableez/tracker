/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mxd0vyvv5m4z543")

  // remove
  collection.schema.removeField("njw0fstb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mxd0vyvv5m4z543")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njw0fstb",
    "name": "balance",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
