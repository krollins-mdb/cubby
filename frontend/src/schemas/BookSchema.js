import {Realm} from '@realm/react'
export class Book extends Realm.Object {
  constructor(
    realm,
    _id,
    owner_id,
    url,
    key,
    title,
    subtitle,
    numberOfPages,
    assignee
  ) {super(realm, {
      _id,
      owner_id,
      url,
      key,
      title,
      subtitle,
      numberOfPages,
      assignee
    });
  }

  static generate(bookInfo, userId, cubby) {
    return {
      _id: new Realm.BSON.ObjectId(),
      owner_id: userId,
      url: bookInfo.url,
      key: bookInfo.key ? bookInfo.key : "",
      title: bookInfo.title,
      subtitle: bookInfo.subtitle ? bookInfo.subtitle : "",
      numberOfPages: bookInfo.number_of_pages,
    };
  }

  // Realm object schema
  static schema = {
    name: "Book",
    properties: {
      _id: "objectId",
      owner_id: "string",
      url: "string",
      key: "string",
      title: "string",
      subtitle: "string",
      numberOfPages: "int",
      assignee: {
        type: "linkingObjects",
        objectType: "Cubby",
        property: "books"
      }   
    },
    primaryKey: "_id",
  };
}

// constructor(
  //   realm,
  //   _id,
  //   owner_id,
  //   url,
  //   key,
  //   title,
  //   subtitle,
  //   // authors,
  //   numberOfPages,
  //   // publishers,
  //   // publishDate,
  //   // subjects,
  //   // notes,
  //   // tableOfContents,
  //   // links,
  //   // cover,
  //   assignee
  // ) {super(realm, {
  //     _id,
  //     owner_id,
  //     url,
  //     key,
  //     title,
  //     subtitle,
  //     // authors,
  //     numberOfPages,
  //     // publishers,
  //     // publishDate,
  //     // subjects,
  //     // notes,
  //     // tableOfContents,
  //     // links,
  //     // cover,
  //     assignee
  //   });
  // }

  // static generate(bookInfo, userId, cubby) {
  //   return {
  //     _id: new Realm.BSON.ObjectId(),
  //     owner_id: userId,
  //     url: bookInfo.url,
  //     key: bookInfo.key ? bookInfo.key : "",
  //     title: bookInfo.title,
  //     subtitle: bookInfo.subtitle ? bookInfo.subtitle : "",
  //     // authors: bookInfo.authors,
  //     numberOfPages: bookInfo.number_of_pages,
  //     // publishers: bookInfo.publishers ? bookInfo.publishers : [],
  //     // publishDate: bookInfo.publish_date ? bookInfo.publish_date : "",
  //     // subjects: bookInfo.subjects,
  //     // notes: bookInfo.notes ? bookInfo.notes : "",
  //     // tableOfContents: bookInfo.tableOfContents,
  //     // links: bookInfo.links ? bookInfo.links : [],
  //     // cover: bookInfo.cover,
  //     assignee: cubby
  //   };
  // }

  // static schema = {
  //   name: "Book",
  //   properties: {
  //     _id: "objectId",
  //     owner_id: "string",
  //     url: "string",
  //     key: "string",
  //     title: "string",
  //     subtitle: "string",
  //     authors: "{}",
  //     numberOfPages: "int",
  //     publishers: "{}",
  //     publishDate: "date",
  //     subjects: "{}",
  //     notes: "string",
  //     tableOfContents: "{}",
  //     links: "{}",
  //     cover: "{}",
  //     assignee: {
  //       type: "linkingObjects",
  //       objectType: "Cubby",
  //       property: "books"
  //     }   
  //   },
  //   primaryKey: "_id",
  // };