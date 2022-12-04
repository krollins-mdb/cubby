import { Realm } from '@realm/react'

const Link = {
  name: "Link",
  embedded: true,
  properties: {
    title: "string",
    url: "string"
  },
};

const Publisher = {
  name: "Publisher",
  embedded: true,
  properties: {
    name: "string"
  },
};

const Subject = {
  name: "Subject",
  embedded: true,
  properties: {
    name: "string",
    url: "string"
  }
};

const Toc = {
  name: "Table_of_contents",
  embedded: true,
  properties: {
    level: "int",
    title: "string",
    pagenumb: "string"
  }
};

const Author = {
  name: "Author",
  embedded: true,
  properties: {
    name: "string",
    url: "string"
  },
};

class Book extends Realm.Object {
  constructor(
    realm,
    _id,
    owner_id,
    url,
    key,
    title,
    subtitle,
    numberOfPages,
    cover,
    subjects,
    notes,
    tableOfContents,
    links,
    publishers,
    publishDate,
    authors,
    identifiers,
    assignee,

  ) {super(realm, {
      _id,
      owner_id,
      url,
      key,
      title,
      subtitle,
      numberOfPages,
      cover,
      subjects,
      notes,
      tableOfContents,
      links,
      publishers,
      publishDate,
      authors,
      identifiers,
      assignee
    });
  }

  static generate(bookInfo, userId, cubby) {
    return {
      _id: new Realm.BSON.ObjectId(),
      owner_id: userId,
      url: bookInfo.url,
      key: bookInfo.key,
      title: bookInfo.title,
      subtitle: bookInfo.subtitle ? bookInfo.subtitle : "",
      numberOfPages: bookInfo.number_of_pages,
      cover: bookInfo.cover,
      subjects: bookInfo.subjects,
      notes: bookInfo.notes ? bookInfo.notes : "",
      tableOfContents: bookInfo.table_of_contents,
      links: bookInfo.links,
      publishers: bookInfo.publishers,
      // publishDate: bookInfo.publishDate ? bookInfo.publishDate : "",
      authors: bookInfo.authors,
      identifiers: bookInfo.identifiers,
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
      subtitle: "string?",
      numberOfPages: "int",
      cover: "{}",
      subjects: {type: "list", objectType:"Subject"},
      notes: "string?",
      tableOfContents: {type: "list", objectType:"Table_of_contents"},
      links: {type: "list", objectType:"Link"},
      publishers: {type: "list", objectType:"Publisher"},
      // publishDate: "date",
      authors: {type: "list", objectType:"Author"},
      // identifiers: "{}",
      assignee: {
        type: "linkingObjects",
        objectType: "Section",
        property: "books"
      }   
    },
    primaryKey: "_id",
  };
}

class Cubby extends Realm.Object {
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
      sections: "Section[]",
    },
    primaryKey: "_id",
  };
}

class Section extends Realm.Object {
  constructor(
    realm,
    _id,
    owner_id,
    name,
    books,
    colors,
    assignee
  ) {super(realm, {
      _id,
      owner_id,
      name,
      books,
      colors,
      assignee
    });
  }

  static generate(owner_id, name, books, colors) {
    return {
      _id: new Realm.BSON.ObjectId(),
      owner_id,
      name,
      books,
      colors
    };
  }

  static schema = {
    name: "Section",
    properties: {
      _id: "objectId",
      owner_id: "string",
      name: "string",
      books: "Book[]",
      colors: "{}",
      assignee: {
        type: "linkingObjects",
        objectType: "Cubby",
        property: "sections"
      }  
    },
    primaryKey: "_id",
  };
}

export {
  Cubby, 
  Section, 
  Book,
  Author,
  Link,
  Subject,
  Toc,
  Publisher
}