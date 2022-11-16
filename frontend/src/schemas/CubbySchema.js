import {BSON} from "realm";
import {Realm} from '@realm/react'

export class Cubby extends Realm.Object {
  constructor({
    _id,
    owner_id,
    name,
    description,
    books
  }) {
    this._id = _id;
    this.owner_id = owner_id;
    this.name = name;
    this.description = description;
    this.books = books;
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