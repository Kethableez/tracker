/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  accounts.id, \n  accounts.name, \n  accounts.color, \n  accounts.user,\n  SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) as rebalance,\n  SUM(CASE WHEN expenses.type = 'INCOME' THEN expenses.amount ELSE 0 END) as balance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // remove
  collection.schema.removeField("tq1997gm")

  // remove
  collection.schema.removeField("pkghkeoq")

  // remove
  collection.schema.removeField("5stqmh3l")

  // remove
  collection.schema.removeField("s3s4nhxv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqyf3hac",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "poqqhu9f",
    "name": "color",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5s4xsrlh",
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
    "id": "wcrkvojs",
    "name": "rebalance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iwmfojl3",
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
    "query": "SELECT\naccounts.id, accounts.name, accounts.color, accounts.user,\n  SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) AS rebalance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tq1997gm",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pkghkeoq",
    "name": "color",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5stqmh3l",
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
    "id": "s3s4nhxv",
    "name": "rebalance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("bqyf3hac")

  // remove
  collection.schema.removeField("poqqhu9f")

  // remove
  collection.schema.removeField("5s4xsrlh")

  // remove
  collection.schema.removeField("wcrkvojs")

  // remove
  collection.schema.removeField("iwmfojl3")

  return dao.saveCollection(collection)
})
