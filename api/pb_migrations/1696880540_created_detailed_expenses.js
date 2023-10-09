/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6nrfaxyddbhhbqj",
    "created": "2023-10-09 19:42:20.169Z",
    "updated": "2023-10-09 19:42:20.169Z",
    "name": "detailed_expenses",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select expenses.id, expenses.name, accounts.balance from expenses right join accounts on expenses.account = accounts.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6nrfaxyddbhhbqj");

  return dao.deleteCollection(collection);
})
