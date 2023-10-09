/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select \n  expenses.id, \n  expenses.name,\n  expenses.amount,\n  expenses.type,\n  expenses.date,\n  expenses.user,\n  categories.name as categoryName,\n  categories.color as categoryColor,\n  accounts.name as accountName, \n  accounts.color as accountColor\nfrom expenses \n  left join accounts on expenses.account = accounts.id\n  left join categories on expenses.category = categories.id"
  }

  // remove
  collection.schema.removeField("ujccblar")

  // remove
  collection.schema.removeField("aazbolnv")

  // remove
  collection.schema.removeField("w8mcd3ts")

  // remove
  collection.schema.removeField("zqn4qqmj")

  // remove
  collection.schema.removeField("4o8gvyqn")

  // remove
  collection.schema.removeField("iym33lyr")

  // remove
  collection.schema.removeField("j2ott3ct")

  // remove
  collection.schema.removeField("kpfigm3p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hp1rdgdo",
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
    "id": "vhxoiwgm",
    "name": "amount",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1yzic4ip",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0gsiymad",
    "name": "date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxje8plt",
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
    "id": "aacto4yz",
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
    "id": "z5gldb1s",
    "name": "categoryColor",
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
    "id": "nhwyvy0e",
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
    "id": "7hhkridx",
    "name": "accountColor",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select \n  expenses.id, \n  expenses.name,\n  expenses.amount,\n  expenses.type,\n  expenses.date,\n  expenses.user,\n  categories.name as categoryName, \n  accounts.name as accountName, \n  accounts.balance \nfrom expenses \n  left join accounts on expenses.account = accounts.id\n  left join categories on expenses.category = categories.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujccblar",
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
    "id": "aazbolnv",
    "name": "amount",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8mcd3ts",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zqn4qqmj",
    "name": "date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4o8gvyqn",
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
    "id": "iym33lyr",
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
    "id": "j2ott3ct",
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
    "id": "kpfigm3p",
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
  collection.schema.removeField("hp1rdgdo")

  // remove
  collection.schema.removeField("vhxoiwgm")

  // remove
  collection.schema.removeField("1yzic4ip")

  // remove
  collection.schema.removeField("0gsiymad")

  // remove
  collection.schema.removeField("kxje8plt")

  // remove
  collection.schema.removeField("aacto4yz")

  // remove
  collection.schema.removeField("z5gldb1s")

  // remove
  collection.schema.removeField("nhwyvy0e")

  // remove
  collection.schema.removeField("7hhkridx")

  return dao.saveCollection(collection)
})
