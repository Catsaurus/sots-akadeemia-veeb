/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Contact = {
  _id: string;
  _type: "contact";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  locationCardTitle?: string;
  contactCardTitle?: string;
  teachers?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "teacher";
  }>;
};

export type Calendar = {
  _id: string;
  _type: "calendar";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  classes?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "shortCourse";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "masterClass";
      };
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "calendar";
  };
  timeConfirmed?: boolean;
  active?: boolean;
  startDate?: string;
  endDate?: string;
};

export type TextBlock = {
  _type: "textBlock";
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type MenuItem = {
  _type: "menuItem";
  name?: string;
  type?: "dropdown" | "reference";
  reference?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "masterClass";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "shortCourse";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "courseModule";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "genericPage";
      };
  dropdownType?: "MASTERCLASS" | "COURSE_MODULE";
};

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  address?: string;
  mainContactEmail?: string;
  mainContactPhone?: string;
  companyCode?: string;
  bankIban?: string;
  title?: string;
  description?: string;
  menu?: Array<
    {
      _key: string;
    } & MenuItem
  >;
  footerContent?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type Teacher = {
  _id: string;
  _type: "teacher";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type GenericPage = {
  _id: string;
  _type: "genericPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  blocks?: Array<
    | ({
        _key: string;
      } & TextBlock)
    | ({
        _key: string;
      } & ShortCourseTable)
  >;
};

export type ShortCourseTable = {
  _type: "shortCourseTable";
  title?: string;
};

export type ShortCourse = {
  _id: string;
  _type: "shortCourse";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  shortDescription?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  slug?: Slug;
  registrationLink?: string;
  minParticipants?: string;
  maxParticipants?: number;
  courseSize?: number;
  price?: number;
  city?: string;
  address?: string;
  courseModule?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "courseModule";
  };
};

export type CourseModule = {
  _id: string;
  _type: "courseModule";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  shortDescription?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  slug?: Slug;
  color?: Color;
  registrationLink?: string;
  minParticipants?: number;
  maxParticipants?: number;
  courseSize?: number;
  price?: number;
  city?: string;
  address?: string;
  teachers?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "teacher";
  }>;
};

export type MasterClass = {
  _id: string;
  _type: "masterClass";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  shortDescription?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  color?: Color;
  courses?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "shortCourse";
  }>;
  registrationLink?: string;
  minParticipants?: number;
  maxParticipants?: number;
  courseSize?: number;
  price?: number;
  city?: string;
  address?: string;
  teachers?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "teacher";
  }>;
  contact?: string;
  payment?: string;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type Color = {
  _type: "color";
  hex?: string;
  alpha?: number;
  hsl?: HslaColor;
  hsv?: HsvaColor;
  rgb?: RgbaColor;
};

export type RgbaColor = {
  _type: "rgbaColor";
  r?: number;
  g?: number;
  b?: number;
  a?: number;
};

export type HsvaColor = {
  _type: "hsvaColor";
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

export type HslaColor = {
  _type: "hslaColor";
  h?: number;
  s?: number;
  l?: number;
  a?: number;
};

export type MediaTag = {
  _id: string;
  _type: "media.tag";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: Slug;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Contact
  | Calendar
  | TextBlock
  | MenuItem
  | Settings
  | Teacher
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | GenericPage
  | ShortCourseTable
  | ShortCourse
  | CourseModule
  | MasterClass
  | BlockContent
  | Color
  | RgbaColor
  | HsvaColor
  | HslaColor
  | MediaTag
  | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/queries.ts
// Variable: MasterClassListQuery
// Query: *[_type == "masterClass"] {    _id,    name,    slug,    shortDescription,    color,    minParticipants,    maxParticipants,    courseSize}
export type MasterClassListQueryResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  shortDescription: string | null;
  color: Color | null;
  minParticipants: number | null;
  maxParticipants: number | null;
  courseSize: number | null;
}>;
// Variable: CourseModuleListQuery
// Query: *[_type == "courseModule"] {  _id,  name,  slug,  color}
export type CourseModuleListQueryResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  color: Color | null;
}>;
// Variable: ShortCourseListQuery
// Query: *[_type == "shortCourse"]{  _id,  name,  "courseModule": @.courseModule->name,  slug}
export type ShortCourseListQueryResult = Array<{
  _id: string;
  name: string | null;
  courseModule: string | null;
  slug: Slug | null;
}>;
// Variable: SingleClassModuleCourseQuery
// Query: *[slug.current == $slug][0]
export type SingleClassModuleCourseQueryResult =
  | {
      _id: string;
      _type: "calendar";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      classes?:
        | {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "masterClass";
          }
        | {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "shortCourse";
          };
      parent?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "calendar";
      };
      timeConfirmed?: boolean;
      active?: boolean;
      startDate?: string;
      endDate?: string;
    }
  | {
      _id: string;
      _type: "contact";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title?: string;
      locationCardTitle?: string;
      contactCardTitle?: string;
      teachers?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "teacher";
      }>;
    }
  | {
      _id: string;
      _type: "courseModule";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      shortDescription?: string;
      body?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      slug?: Slug;
      color?: Color;
      registrationLink?: string;
      minParticipants?: number;
      maxParticipants?: number;
      courseSize?: number;
      price?: number;
      city?: string;
      address?: string;
      teachers?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "teacher";
      }>;
    }
  | {
      _id: string;
      _type: "genericPage";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      slug?: Slug;
      blocks?: Array<
        | ({
            _key: string;
          } & ShortCourseTable)
        | ({
            _key: string;
          } & TextBlock)
      >;
    }
  | {
      _id: string;
      _type: "masterClass";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      slug?: Slug;
      shortDescription?: string;
      body?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      color?: Color;
      courses?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "shortCourse";
      }>;
      registrationLink?: string;
      minParticipants?: number;
      maxParticipants?: number;
      courseSize?: number;
      price?: number;
      city?: string;
      address?: string;
      teachers?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "teacher";
      }>;
      contact?: string;
      payment?: string;
    }
  | {
      _id: string;
      _type: "media.tag";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: Slug;
    }
  | {
      _id: string;
      _type: "sanity.fileAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      source?: SanityAssetSourceData;
    }
  | {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    }
  | {
      _id: string;
      _type: "settings";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      address?: string;
      mainContactEmail?: string;
      mainContactPhone?: string;
      companyCode?: string;
      bankIban?: string;
      title?: string;
      description?: string;
      menu?: Array<
        {
          _key: string;
        } & MenuItem
      >;
      footerContent?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
    }
  | {
      _id: string;
      _type: "shortCourse";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      shortDescription?: string;
      body?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      slug?: Slug;
      registrationLink?: string;
      minParticipants?: string;
      maxParticipants?: number;
      courseSize?: number;
      price?: number;
      city?: string;
      address?: string;
      courseModule?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "courseModule";
      };
    }
  | {
      _id: string;
      _type: "teacher";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      description?: string;
    }
  | null;
// Variable: MasterClassPathsQuery
// Query: *[_type in ["masterClass", "courseModule", "shortCourse", "genericPage"] && defined(slug.current)][]{    "params": { "slug": slug.current }  }
export type MasterClassPathsQueryResult = Array<{
  params: {
    slug: string | null;
  };
}>;
// Variable: SettingsQuery
// Query: *[_type == "settings"][0]{  ...,  menu[]{    ...,    "slug": @.reference->slug.current  }}
export type SettingsQueryResult = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  address?: string;
  mainContactEmail?: string;
  mainContactPhone?: string;
  companyCode?: string;
  bankIban?: string;
  title?: string;
  description?: string;
  menu: Array<{
    _key: string;
    _type: "menuItem";
    name?: string;
    type?: "dropdown" | "reference";
    reference?:
      | {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "courseModule";
        }
      | {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "genericPage";
        }
      | {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "masterClass";
        }
      | {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "shortCourse";
        };
    dropdownType?: "COURSE_MODULE" | "MASTERCLASS";
    slug: string | null;
  }> | null;
  footerContent?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
} | null;
// Variable: ContactQuery
// Query: *[_type == "contact"][0]{  ...,  teachers[]{    ...,    "name": @->name,    "image": @->image,    "description": @->description  }}
export type ContactQueryResult = {
  _id: string;
  _type: "contact";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  locationCardTitle?: string;
  contactCardTitle?: string;
  teachers: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    name: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    } | null;
    description: string | null;
  }> | null;
} | null;
// Variable: TeachersQuery
// Query: *[_type == "teacher"]
export type TeachersQueryResult = Array<{
  _id: string;
  _type: "teacher";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
}>;
// Variable: CalendarQuery
// Query: *[_type == "calendar"]{  ...,  "course": {    "_type": @.classes->_type,    "slug": @.classes->slug.current,    "name": @.classes->name,    "moduleName": @.classes->courseModule->name,    "color": @.classes->color,    "maxParticipants": @.classes->maxParticipants,    "minParticipants": @.classes->minParticipants  }}
export type CalendarQueryResult = Array<{
  _id: string;
  _type: "calendar";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  classes?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "masterClass";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "shortCourse";
      };
  parent?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "calendar";
  };
  timeConfirmed?: boolean;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  course: {
    _type: "masterClass" | "shortCourse" | null;
    slug: string | null;
    name: string | null;
    moduleName: null | string;
    color: Color | null;
    maxParticipants: number | null;
    minParticipants: number | null | string;
  };
}>;
// Variable: CalendarEventByCourseQuery
// Query: *[_type == "calendar" && classes->slug.current == $slug][]{  ...,  "parent": {    "_type": @.parent->_type,    "name": @.parent->name,    "startDate": @.parent->startDate,    "endDate": @.parent->endDate,    "course": {      "_type": @.classes->_type,      "slug": @.classes->slug.current,      "name": @.classes->name,      "moduleName": @.classes->courseModule->name,      "color": @.classes->color,      "maxParticipants": @.classes->maxParticipants,      "minParticipants": @.classes->minParticipants    }  }}
export type CalendarEventByCourseQueryResult = Array<{
  _id: string;
  _type: "calendar";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  classes?:
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "masterClass";
      }
    | {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "shortCourse";
      };
  parent: {
    _type: "calendar" | null;
    name: string | null;
    startDate: string | null;
    endDate: string | null;
    course: {
      _type: "masterClass" | "shortCourse" | null;
      slug: string | null;
      name: string | null;
      moduleName: null | string;
      color: Color | null;
      maxParticipants: number | null;
      minParticipants: number | null | string;
    };
  };
  timeConfirmed?: boolean;
  active?: boolean;
  startDate?: string;
  endDate?: string;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    '*[_type == "masterClass"] {\n    _id,\n    name,\n    slug,\n    shortDescription,\n    color,\n    minParticipants,\n    maxParticipants,\n    courseSize\n}': MasterClassListQueryResult;
    '*[_type == "courseModule"] {\n  _id,\n  name,\n  slug,\n  color\n}': CourseModuleListQueryResult;
    '*[_type == "shortCourse"]{\n  _id,\n  name,\n  "courseModule": @.courseModule->name,\n  slug\n}': ShortCourseListQueryResult;
    "*[slug.current == $slug][0]": SingleClassModuleCourseQueryResult;
    '*[_type in ["masterClass", "courseModule", "shortCourse", "genericPage"] && defined(slug.current)][]{\n    "params": { "slug": slug.current }\n  }': MasterClassPathsQueryResult;
    '*[_type == "settings"][0]\n{\n  ...,\n  menu[]{\n    ...,\n    "slug": @.reference->slug.current\n  }\n}': SettingsQueryResult;
    '*[_type == "contact"][0]{\n  ...,\n  teachers[]{\n    ...,\n    "name": @->name,\n    "image": @->image,\n    "description": @->description\n  }\n}': ContactQueryResult;
    '*[_type == "teacher"]': TeachersQueryResult;
    '*[_type == "calendar"]{\n  ...,\n  "course": {\n    "_type": @.classes->_type,\n    "slug": @.classes->slug.current,\n    "name": @.classes->name,\n    "moduleName": @.classes->courseModule->name,\n    "color": @.classes->color,\n    "maxParticipants": @.classes->maxParticipants,\n    "minParticipants": @.classes->minParticipants\n  }\n}': CalendarQueryResult;
    '*[_type == "calendar" && classes->slug.current == $slug][]{\n  ...,\n  "parent": {\n    "_type": @.parent->_type,\n    "name": @.parent->name,\n    "startDate": @.parent->startDate,\n    "endDate": @.parent->endDate,\n    "course": {\n      "_type": @.classes->_type,\n      "slug": @.classes->slug.current,\n      "name": @.classes->name,\n      "moduleName": @.classes->courseModule->name,\n      "color": @.classes->color,\n      "maxParticipants": @.classes->maxParticipants,\n      "minParticipants": @.classes->minParticipants\n    }\n  }\n}': CalendarEventByCourseQueryResult;
  }
}
