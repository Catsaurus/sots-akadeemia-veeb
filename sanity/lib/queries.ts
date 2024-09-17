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
  _type,
  name,
  slug,
  color
}`;

export const ShortCourseListQuery = groq`*[_type == "shortCourse"]{
  _id,
  _type,
  name,
  "courseModule": *[_type == "courseModule" && references(^._id)][0]{
    ...
  },
  slug,
  registrationLink
}`;

// Get a single post by its slug
export const SingleClassModuleCourseQuery = groq`*[_type in ["masterClass", "courseModule", "shortCourse"] && slug.current == $slug][0]{
  ...,
  teachers[]{
    ...,
    "name": @->name,
    "image": @->image,
    "description": @->description,
    "email": @->email,
    "phone": @->phone
  },
  courses[]{
    ...,
    "slug": @->slug
  },
  contactPerson{
    ...,
    "name": @->name,
    "image": @->image,
    "description": @->description,
    "email": @->email,
    "phone": @->phone
  }
}`;

export const SingleGenericPageQuery = groq`*[_type == "genericPage" && slug.current == $slug][0]`;

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
    "description": @->description,
    "email": @->email,
    "phone": @->phone
  }
}`;

export const TeachersQuery = groq`*[_type == "teacher"]`;


export const CalendarQuery = groq`*[_type == "calendar"]{
  ...,
  "course": {
    "_type": @.classes->_type,
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "courseModule": *[_type == "courseModule" && references(^.classes->_id)][0],
    "masterClass": *[_type == "masterClass" && references(^.classes->_id)][0],
    "color": @.classes->color,
    "maxParticipants": @.classes->maxParticipants,
    "minParticipants": @.classes->minParticipants
  },
  "parent": {
    "_type": @.parent->_type,
    "name": @.parent->name,
    "startDate": @.parent->startDate,
    "endDate": @.parent->endDate,
    "course": {
      "_type": @.parent->classes->_type,
      "slug": @.parent->classes->slug.current,
      "name": @.parent->classes->name,
      "color": @.parent->classes->color,
      "maxParticipants": @.parent->classes->maxParticipants,
      "minParticipants": @.parent->classes->minParticipants
    }
  }
}`;

export const CalendarEventByCourseQuery = groq`*[_type == "calendar" && classes->slug.current == $slug][]{
  ...,
  "course": {
    "_type": @.classes->_type,
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "courseModule": *[_type == "courseModule" && references(^.classes->_id)][0],
    "masterClass": *[_type == "masterClass" && references(^.classes->_id)][0],
    "color": @.classes->color,
    "maxParticipants": @.classes->maxParticipants,
    "minParticipants": @.classes->minParticipants
  },
  "parent": {
    "_type": @.parent->_type,
    "name": @.parent->name,
    "startDate": @.parent->startDate,
    "endDate": @.parent->endDate,
    "course": {
      "_type": @.parent->classes->_type,
      "slug": @.parent->classes->slug.current,
      "name": @.parent->classes->name,
      "color": @.parent->classes->color,
      "maxParticipants": @.parent->classes->maxParticipants,
      "minParticipants": @.parent->classes->minParticipants
    }
  }
}`;