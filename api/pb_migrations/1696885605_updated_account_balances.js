/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr")

  collection.options = {
    "query": "SELECT\n  accounts.id, \n  accounts.name, \n  accounts.color, \n  accounts.user,\n  (SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) +\n  SUM(CASE WHEN expenses.type = 'INCOME' THEN expenses.amount ELSE 0 END) -\n  SUM(CASE WHEN expenses.type = 'OUTCOME' THEN expenses.amount ELSE 0 END)\n  )as balance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // remove
  collection.schema.removeField("qcjilf3h")

  // remove
  collection.schema.removeField("ipwbdz4o")

  // remove
  collection.schema.removeField("efhlwwph")

  // remove
  collection.schema.removeField("lk7ttwyl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bctqcpab",
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
    "id": "po6o74go",
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
    "id": "ot8pahpn",
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
    "id": "rrejssvg",
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
    "query": "SELECT\n  accounts.id, \n  accounts.name, \n  accounts.color, \n  accounts.user,\n  (SUM(CASE WHEN expenses.type = 'REBALANCE' THEN expenses.amount ELSE 0 END) -\n  SUM(CASE WHEN expenses.type = 'INCOME' THEN expenses.amount ELSE 0 END) )as balance\nfrom \n  accounts\nLEFT JOIN expenses \n  on expenses.account = accounts.id\ngroup BY\n  accounts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcjilf3h",
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
    "id": "ipwbdz4o",
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
    "id": "efhlwwph",
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
    "id": "lk7ttwyl",
    "name": "balance",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("bctqcpab")

  // remove
  collection.schema.removeField("po6o74go")

  // remove
  collection.schema.removeField("ot8pahpn")

  // remove
  collection.schema.removeField("rrejssvg")

  return dao.saveCollection(collection)
})
