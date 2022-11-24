import { createRealmContext } from "@realm/react";
import { 
  Cubby, 
  Section, 
  Book,
  Publisher,
  Link,
  Author,
  Subject,
  Toc
} from "./schemas/AllSchemas";


export default createRealmContext({
  schema: [
    Cubby, 
    Section, 
    Book,
    Publisher,
    Author,
    Subject,
    Toc,
    Link
  ]
});
