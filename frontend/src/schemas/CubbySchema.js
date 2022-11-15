import {BSON} from "realm";

export class Cubby {
  constructor({
    _id = new BSON.ObjectId(),
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

  static schema = {
    name: "Cubby",
    properties: {
      _id: "objectId",
      owner_id: "string",
      name: "string",
      description: "string",
      // books: "Book[]",
    },
    primaryKey: "_id",
  };
}