/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\naccounts.id, accounts.name, accounts.color, accounts.user,\n  SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) AS rebalance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // remove
  collection.schema.removeField("9nse7udf")

  // remove
  collection.schema.removeField("patfezgv")

  // remove
  collection.schema.removeField("bfmgsyz1")

  // remove
  collection.schema.removeField("s1in8vkz")

  // remove
  collection.schema.removeField("8krg3cxl")

  // remove
  collection.schema.removeField("lw1jiwsm")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  id,\n  name,\n  color,\n  user,\n  COALESCE((select SUM(expenses.amount) from expenses where expenses.type = 'REBALANCE' and expenses.account = accounts.id ), 0) as rebalance,\n  COALESCE((select SUM(expenses.amount) from expenses where expenses.type = 'INCOME' and expenses.account = accounts.id ), 0) as income,\n    COALESCE((select SUM(expenses.amount) from expenses where expenses.type = 'OUTCOME' and expenses.account = accounts.id ), 0) as outcome\n  from accounts"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9nse7udf",
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
    "id": "patfezgv",
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
    "id": "bfmgsyz1",
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
    "id": "s1in8vkz",
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
    "id": "8krg3cxl",
    "name": "income",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lw1jiwsm",
    "name": "outcome",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("tq1997gm")

  // remove
  collection.schema.removeField("pkghkeoq")

  // remove
  collection.schema.removeField("5stqmh3l")

  // remove
  collection.schema.removeField("s3s4nhxv")

  return dao.saveCollection(collection)
})
