/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zw3wavihitquhuv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wszh2zap",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "INCOME",
        "OUTCOME",
        "REBALANCE"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zw3wavihitquhuv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wszh2zap",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "INCOME",
        "OUTCOME"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
