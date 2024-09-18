import { groq } from "next-sanity";
import { seo } from "./seoQueryFields";

// Get all meistriklassid
export const MasterClassListQuery = groq`*[_type == "masterClass"] {
    _id,
    name,
    slug,
    shortDescription,
    color,
    minParticipants,
    maxParticipants,
    courseSize,
    documentNotReady
}`;

export const CourseModuleListQuery = groq`*[_type == "courseModule"] {
  _id,
  _type,
  name,
  slug,
  color,
  documentNotReady,
  notSeparatelyTakeable
}`;

export const ShortCourseListQuery = groq`*[_type == "shortCourse"]{
  _id,
  _type,
  name,
  "courseModule": *[_type == "courseModule" && references(^._id)][0]{
    ...
  },
  slug,
  registrationLink,
  documentNotReady
}`;

// Get a single post by its slug
export const SingleClassModuleCourseQuery = groq`*[_type in ["masterClass", "courseModule", "shortCourse"] && slug.current == $slug][0]{
  ...,
  courses[]{
    ...,
    "slug": @->slug,
  },
  "teachers": *[_type == "teacher" && _id in *[_type == "shortCourse" && (_id in ^.^.courses[]._ref || _id == ^.^._id)].teachers[]._ref],
  contactPerson{
    ...,
    "name": @->name,
    "image": @->image,
    "description": @->description,
    "email": @->email,
    "phone": @->phone
  },
  ${seo},
}`;

export const SingleGenericPageQuery = groq`*[_type == "genericPage" && slug.current == $slug][0]{
  ...,
  ${seo}
}`;

// Get all post slugs
export const MasterClassPathsQuery = groq`*[_type in ["masterClass", "courseModule", "shortCourse", "genericPage"] && defined(slug.current) && documentNotReady != true][]{
  "params": { "slug": slug.current },
  "updatedAt": _updatedAt
}`;

export const SettingsQuery = groq`*[_type == "settings"][0]
{
  ...,
  menu[]{
    ...,
    "slug": @.reference->slug.current
  },
  ${seo}
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
  },
  ${seo}
}`;

export const TeachersQuery = groq`*[_type == "teacher"]`;


export const CalendarQuery = groq`*[_type == "calendar"]{
  ...,
  "course": {
    "_id": @.classes->_id, 
    "_type": @.classes->_type,
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "courseModule": *[_type == "courseModule" && references(^.classes->_id)][0],
    "masterClass": *[_type == "masterClass" && references(^.classes->_id)][0],
    "color": @.classes->color,
    "maxParticipants": @.classes->maxParticipants,
    "minParticipants": @.classes->minParticipants,
    "courseSize": @.classes->courseSize
  },
  parentMasterClasses[]{
    ...,
    "_id": @->_id,
    "_type": @->_type,
    "startDate": @->startDate,
    "endDate": @->endDate,
    "course": {
      "_id": @->classes->_id,
      "_type": @->classes->_type,
      "slug": @->classes->slug.current,
      "name": @->classes->name,
    }
  },
  parentCourseModules[]{
    ...,
    "_id": @->_id,
    "_type": @->_type,
    "startDate": @->startDate,
    "endDate": @->endDate,
    "course": {
      "_id": @->classes->_id,
      "_type": @->classes->_type,
      "slug": @->classes->slug.current,
      "name": @->classes->name,
    }
  }
}`;

export const CalendarEventByCourseQuery = groq`*[_type == "calendar" && classes->slug.current == $slug][]{
  ...,
  "course": {
    "_id": @.classes->_id, 
    "_type": @.classes->_type,
    "slug": @.classes->slug.current,
    "name": @.classes->name,
    "courseModule": *[_type == "courseModule" && references(^.classes->_id)][0],
    "masterClass": *[_type == "masterClass" && references(^.classes->_id)][0],
    "color": @.classes->color,
    "maxParticipants": @.classes->maxParticipants,
    "minParticipants": @.classes->minParticipants
  },
  parentMasterClasses[]{
    ...,
    "_id": @->_id,
    "_type": @->_type,
    "startDate": @->startDate,
    "endDate": @->endDate,
    "course": {
      "_id": @->classes->_id,
      "_type": @->classes->_type,
      "slug": @->classes->slug.current,
      "name": @->classes->name,
    }
  },
  parentCourseModules[]{
    ...,
    "_id": @->_id,
    "_type": @->_type,
    "startDate": @->startDate,
    "endDate": @->endDate,
    "course": {
      "_id": @->classes->_id,
      "_type": @->classes->_type,
      "slug": @->classes->slug.current,
      "name": @->classes->name,
    }
  }
}`;