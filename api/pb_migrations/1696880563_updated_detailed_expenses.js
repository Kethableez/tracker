/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select expenses.id, expenses.name, accounts.balance from expenses left join accounts on expenses.account = accounts.id"
  }

  // remove
  collection.schema.removeField("uag3ajr3")

  // remove
  collection.schema.removeField("lkndyb1x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtctzr3b",
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
    "id": "kz82qliz",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select expenses.id, expenses.name, accounts.balance from expenses right join accounts on expenses.account = accounts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uag3ajr3",
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
    "id": "lkndyb1x",
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

  // remove
  collection.schema.removeField("vtctzr3b")

  // remove
  collection.schema.removeField("kz82qliz")

  return dao.saveCollection(collection)
})
