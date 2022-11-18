import {Realm} from '@realm/react'

export class Cubby extends Realm.Object {
  constructor(
    realm,
    _id,
    owner_id,
    name,
    description,
    books
  ) {super(realm, {
      _id,
      owner_id,
      name,
      description,
      books
    });
  }

  static generate(owner_id, name, description, books) {
    return {
      _id: new Realm.BSON.ObjectId(),
      owner_id,
      name,
      description,
      books
    };
  }

  static schema = {
    name: "Cubby",
    properties: {
      _id: "objectId",
      owner_id: "string",
      name: "string",
      description: "string",
      books: "Book[]",
    },
    primaryKey: "_id",
  };
}