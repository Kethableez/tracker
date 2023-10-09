/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  id,\n  name,\n  color,\n  user,\n  COALESCE((select SUM(expenses.amount) from expenses where expenses.type = 'REBALANCE' and expenses.account = accounts.id ), 0) as rebalance,\n    (select SUM(expenses.amount) from expenses where expenses.type = 'INCOME' and expenses.account = accounts.id ) as income,\n    (select SUM(expenses.amount) from expenses where expenses.type = 'OUTCOME' and expenses.account = accounts.id ) as outcome\n  from accounts"
  }

  // remove
  collection.schema.removeField("8frtw2et")

  // remove
  collection.schema.removeField("8hftp07n")

  // remove
  collection.schema.removeField("srbuyf8y")

  // remove
  collection.schema.removeField("g0abs0u1")

  // remove
  collection.schema.removeField("adlwvdub")

  // remove
  collection.schema.removeField("8l3tjsme")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hauwfdyz",
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
    "id": "ukjbajuy",
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
    "id": "xecobgxr",
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
    "id": "1zhsun6u",
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
    "id": "7yiokwdm",
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
    "id": "lye56kop",
    "name": "outcome",
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
    "query": "SELECT\n  id,\n  name,\n  color,\n  user,\n  (select SUM(expenses.amount) from expenses where expenses.type = 'REBALANCE' and expenses.account = accounts.id ) as rebalance,\n    (select SUM(expenses.amount) from expenses where expenses.type = 'INCOME' and expenses.account = accounts.id ) as income,\n    (select SUM(expenses.amount) from expenses where expenses.type = 'OUTCOME' and expenses.account = accounts.id ) as outcome\n  from accounts"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8frtw2et",
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
    "id": "8hftp07n",
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
    "id": "srbuyf8y",
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
    "id": "g0abs0u1",
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
    "id": "adlwvdub",
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
    "id": "8l3tjsme",
    "name": "outcome",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("hauwfdyz")

  // remove
  collection.schema.removeField("ukjbajuy")

  // remove
  collection.schema.removeField("xecobgxr")

  // remove
  collection.schema.removeField("1zhsun6u")

  // remove
  collection.schema.removeField("7yiokwdm")

  // remove
  collection.schema.removeField("lye56kop")

  return dao.saveCollection(collection)
})
