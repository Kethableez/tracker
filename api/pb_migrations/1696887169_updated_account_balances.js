/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  accounts.id, \n  accounts.user,\n  (SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) +\n  SUM(CASE WHEN expenses.type = 'INCOME' THEN expenses.amount ELSE 0 END) -\n  SUM(CASE WHEN expenses.type = 'OUTCOME' THEN expenses.amount ELSE 0 END)\n  )as balance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // remove
  collection.schema.removeField("fybk3axd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8olbw90f",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0tetxvuh",
    "name": "balance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  accounts.id, \n  (SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) +\n  SUM(CASE WHEN expenses.type = 'INCOME' THEN expenses.amount ELSE 0 END) -\n  SUM(CASE WHEN expenses.type = 'OUTCOME' THEN expenses.amount ELSE 0 END)\n  )as balance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fybk3axd",
    "name": "balance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("8olbw90f")

  // remove
  collection.schema.removeField("0tetxvuh")

  return dao.saveCollection(collection)
})
