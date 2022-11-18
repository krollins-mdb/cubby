import {createRealmContext} from "@realm/react";
import {Cubby} from "./schemas/CubbySchema";
import {Book} from "./schemas/BookSchema";

export default createRealmContext({
  schema: [Cubby, Book]
});
