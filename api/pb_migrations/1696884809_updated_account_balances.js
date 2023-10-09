/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  id,\n  name,\n  color,\n  user,\n  (select SUM(expenses.amount) from expenses where expenses.type = 'REBALANCE' and expenses.account = accounts.id ) as rebalance\n  from accounts"
  }

  // remove
  collection.schema.removeField("qviforbq")

  // remove
  collection.schema.removeField("3hzk0py9")

  // remove
  collection.schema.removeField("jmhtrc4h")

  // remove
  collection.schema.removeField("wjrm9tgy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7eimhaeo",
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
    "id": "hjvusvyd",
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
    "id": "mzhuvnsp",
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
    "id": "4yqb2tdo",
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
    "query": "SELECT\n  id,\n  name,\n  color,\n  user,\n  (select SUM(expenses.amount) from expenses where expenses.type = 'REBALANCE' and expenses.account = id ) as rebalance\n  from accounts"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qviforbq",
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
    "id": "3hzk0py9",
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
    "id": "jmhtrc4h",
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
    "id": "wjrm9tgy",
    "name": "rebalance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("7eimhaeo")

  // remove
  collection.schema.removeField("hjvusvyd")

  // remove
  collection.schema.removeField("mzhuvnsp")

  // remove
  collection.schema.removeField("4yqb2tdo")

  return dao.saveCollection(collection)
})
