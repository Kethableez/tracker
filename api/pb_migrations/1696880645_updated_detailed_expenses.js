/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select expenses.id, expenses.name, categories.name as categoryName, accounts.name as accountName, accounts.balance from expenses left join accounts on expenses.account = accounts.id\nleft join categories on expenses.category = categories.id"
  }

  // remove
  collection.schema.removeField("qcko1uau")

  // remove
  collection.schema.removeField("5fvuidyi")

  // remove
  collection.schema.removeField("ou8xpckh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d5oll42g",
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
    "id": "e2hnefxi",
    "name": "categoryName",
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
    "id": "6tzvws0l",
    "name": "accountName",
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
    "id": "ppc42ddi",
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
    "query": "select expenses.id, expenses.name, accounts.name as accountName, accounts.balance from expenses left join accounts on expenses.account = accounts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcko1uau",
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
    "id": "5fvuidyi",
    "name": "accountName",
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
    "id": "ou8xpckh",
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
  collection.schema.removeField("d5oll42g")

  // remove
  collection.schema.removeField("e2hnefxi")

  // remove
  collection.schema.removeField("6tzvws0l")

  // remove
  collection.schema.removeField("ppc42ddi")

  return dao.saveCollection(collection)
})
