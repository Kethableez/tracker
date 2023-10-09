/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj")

  collection.options = {
    "query": "select \n  expenses.id, \n  expenses.name,\n  expenses.amount,\n  expenses.type,\n  expenses.date,\n  expenses.user,\n  categories.name as categoryName,\n  categories.color as categoryColor,\n  accounts.name as accountName, \n  accounts.color as accountColor\nfrom expenses \n  left join accounts on expenses.account = accounts.id\n  left join categories on expenses.category = categories.id\nwhere expenses.type != 'REBALANCE'"
  }

  // remove
  collection.schema.removeField("2xcjojni")

  // remove
  collection.schema.removeField("qeukyoky")

  // remove
  collection.schema.removeField("cngk48z1")

  // remove
  collection.schema.removeField("qu6emebo")

  // remove
  collection.schema.removeField("reuwwz9z")

  // remove
  collection.schema.removeField("a0mvhk7e")

  // remove
  collection.schema.removeField("nocgvj1m")

  // remove
  collection.schema.removeField("vruj0qhv")

  // remove
  collection.schema.removeField("fjsidhgu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lkuwczfo",
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
    "id": "nvcl7lcz",
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
    "id": "hovp78lm",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j74q9j4e",
    "name": "date",
    "type": "date",
    "required": false,
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
    "id": "zzw7gplf",
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
    "id": "53gbt8rf",
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
    "id": "vpusrl9w",
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
    "id": "qxonegpw",
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
    "id": "ucnab7wc",
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
    "query": "select \n  expenses.id, \n  expenses.name,\n  expenses.amount,\n  expenses.type,\n  expenses.date,\n  expenses.user,\n  categories.name as categoryName,\n  categories.color as categoryColor,\n  accounts.name as accountName, \n  accounts.color as accountColor\nfrom expenses \n  left join accounts on expenses.account = accounts.id\n  left join categories on expenses.category = categories.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xcjojni",
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
    "id": "qeukyoky",
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
    "id": "cngk48z1",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qu6emebo",
    "name": "date",
    "type": "date",
    "required": false,
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
    "id": "reuwwz9z",
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
    "id": "a0mvhk7e",
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
    "id": "nocgvj1m",
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
    "id": "vruj0qhv",
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
    "id": "fjsidhgu",
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

  // remove
  collection.schema.removeField("lkuwczfo")

  // remove
  collection.schema.removeField("nvcl7lcz")

  // remove
  collection.schema.removeField("hovp78lm")

  // remove
  collection.schema.removeField("j74q9j4e")

  // remove
  collection.schema.removeField("zzw7gplf")

  // remove
  collection.schema.removeField("53gbt8rf")

  // remove
  collection.schema.removeField("vpusrl9w")

  // remove
  collection.schema.removeField("qxonegpw")

  // remove
  collection.schema.removeField("ucnab7wc")

  return dao.saveCollection(collection)
})
