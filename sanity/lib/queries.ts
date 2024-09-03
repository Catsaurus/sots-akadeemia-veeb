import { groq } from "next-sanity";

// Get all meistriklassid
export const MasterClassListQuery = groq`*[_type == "masterClass"] {
    _id,
    name,
    slug,
    color
}`;

// Get a single post by its slug
export const MasterClassQuery = groq`*[_type == "masterClass" && slug.current == $slug][0]{ 
    name, body, courses, registrationLink, minParticipants, maxParticipants, teachers, color
  }`;

// Get all post slugs
export const MasterClassPathsQuery = groq`*[_type == "masterClass" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

export const SettingsQuery = groq`*[_type == "settings"][0]
{
  ...,
  menu[]{
    ...,
    "slug": @.reference->slug.current
  }
}`;

export const CalendarQuery = groq`*[_type == "calendar"]{
  ...,
  "course": {
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "moduleName": @.classes->courseModule->name
  }
}`;

export const CalendarEventByCourseQuery = groq`*[_type == "calendar" && classes->slug.current == $slug][]`;