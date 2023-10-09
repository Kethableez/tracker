/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uh2ekg87ll7o4fr",
    "created": "2023-10-09 20:49:17.723Z",
    "updated": "2023-10-09 20:49:17.723Z",
    "name": "account_balances",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5zhia1bq",
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
        "id": "kqhr67gb",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  id,\n  name,\n  color \n  from accounts"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uh2ekg87ll7o4fr");

  return dao.deleteCollection(collection);
})
