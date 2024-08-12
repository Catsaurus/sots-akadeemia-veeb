import { groq } from "next-sanity";

// Get all meistriklassid
export const meistriklassidQuery = groq`*[_type == "meistriklass"] {
    _id,
    name,
    slug,
    color
}`;

// Get a single post by its slug
export const MEISTRIKLASS_QUERY = groq`*[_type == "meistriklass" && slug.current == $slug][0]{ 
    name, body, ainedList, registrationLink, minOsalejaArv, maxOsalejaArv, koolitajad, color
  }`;

// Get all post slugs
export const meistriklassPathsQuery = groq`*[_type == "meistriklass" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;