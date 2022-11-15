import {BSON} from "realm";

export class Book {
  constructor({
    _id = new BSON.ObjectId(),
    owner_id,
    key,
    title,
    authors,
    numberOfPages,
    publishers,
    publishDate,
    subjects,
    notes,
    tableOfContents,
    links,
    cover,
    assignee
  }) {
    this._id = _id;
    this.owner_id = owner_id,
    this.key = key;
    this.title = title;
    this.authors = authors;
    this.numberOfPages = numberOfPages;
    this.publishers = publishers;
    this.publishDate = publishDate;
    this.subjects = subjects;
    this.notes = notes;
    this.tableOfContents = tableOfContents;
    this.links = links;
    this.cover = cover;
    this.assignee = assignee;
  }

  // Realm object schema
  static schema = {
    name: "Book",
    properties: {
      _id: "objectId",
      owner_id: "string",
      key: "string",
      title: "string",
      authors: "array",
      numberOfPages: "int",
      publishers: "array",
      publishDate: "date",
      subjects: "array",
      notes: "string",
      tableOfContents: "array",
      links: "array",
      cover: "object",
      assignee: {
        type: "linkingObjects",
        objectType: "Cubby",
        property: "books"
      }   
    },
    primaryKey: "_id",
  };
}