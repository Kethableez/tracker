/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zw3wavihitquhuv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y8n45dyf",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zw3wavihitquhuv")

  // remove
  collection.schema.removeField("y8n45dyf")

  return dao.saveCollection(collection)
})
