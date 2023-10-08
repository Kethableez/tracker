/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mxd0vyvv5m4z543")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3gzrvvwl",
    "name": "user",
    "type": "relation",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("mxd0vyvv5m4z543")

  // remove
  collection.schema.removeField("3gzrvvwl")

  return dao.saveCollection(collection)
})
