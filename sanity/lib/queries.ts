import { groq } from "next-sanity";

// Get all meistriklassid
export const MasterClassListQuery = groq`*[_type == "masterClass"] {
    _id,
    name,
    slug,
    shortDescription,
    color,
    minParticipants,
    maxParticipants,
    courseSize
}`;

export const CourseModuleListQuery = groq`*[_type == "courseModule"] {
  _id,
  name,
  slug,
  color
}`;

export const ShortCourseListQuery = groq`*[_type == "shortCourse"]{
  _id,
  name,
  "courseModule": @.courseModule->name,
  slug
}`;

// Get a single post by its slug
export const SingleClassModuleCourseQuery = groq`*[slug.current == $slug][0]`;

// Get all post slugs
export const MasterClassPathsQuery = groq`*[_type in ["masterClass", "courseModule", "shortCourse", "genericPage"] && defined(slug.current)][]{
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

export const ContactQuery = groq`*[_type == "contact"][0]{
  ...,
  teachers[]{
    ...,
    "name": @->name,
    "image": @->image,
    "description": @->description
  }
}`;

export const TeachersQuery = groq`*[_type == "teacher"]`;


export const CalendarQuery = groq`*[_type == "calendar"]{
  ...,
  "course": {
    "_type": @.classes->_type,
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "moduleName": @.classes->courseModule->name,
    "color": @.classes->color,
    "maxParticipants": @.classes->maxParticipants,
    "minParticipants": @.classes->minParticipants
  }
}`;

export const CalendarEventByCourseQuery = groq`*[_type == "calendar" && classes->slug.current == $slug][]{
  ...,
  "parent": {
    "_type": @.parent->_type,
    "name": @.parent->name,
    "startDate": @.parent->startDate,
    "endDate": @.parent->endDate,
    "course": {
      "_type": @.classes->_type,
      "slug": @.classes->slug.current,
      "name": @.classes->name,
      "moduleName": @.classes->courseModule->name,
      "color": @.classes->color,
      "maxParticipants": @.classes->maxParticipants,
      "minParticipants": @.classes->minParticipants
    }
  }
}`;