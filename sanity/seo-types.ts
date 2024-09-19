import { SanityAssetSourceData, SanityImageMetadata } from "./types";

export type PageSeo = {
    _type: "seoMetaFields";
    metaTitle: string | undefined;
    nofollowAttributes: boolean | undefined;
    seoKeywords: Array<string> | undefined;
    metaDescription: string | undefined;
    metaImage: {
      _type: "image";
      crop: {
        _type: "sanity.imageCrop";
        right: number | undefined;
        top: number | undefined;
        left: number | undefined;
        bottom: number | undefined;
      } | undefined;
      hotspot: {
        _type: "sanity.imageHotspot";
        x: number | undefined;
        y: number | undefined;
        height: number | undefined;
        width: number | undefined;
      } | undefined;
      asset: {
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
      } | undefined;
    } | undefined;    
    openGraph: {
      _type: "openGraph";
      siteName: string | undefined;
      url: string | undefined;
      description: string | undefined;
      title: string | undefined;
      image: {
        _type: "image";
        crop: {
          _type: "sanity.imageCrop";
          right: number | undefined;
          top: number | undefined;
          left: number | undefined;
          bottom: number | undefined;
        } | undefined;
        hotspot: {
          _type: "sanity.imageHotspot";
          x: number | undefined;
          y: number | undefined;
          height: number | undefined;
          width: number | undefined;
        } | undefined;
        asset: {
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
        } | undefined;
      } | undefined;
    } | undefined;
    twitter: {
      _type: "twitter";
      site: string | undefined;
      creator: string | undefined;
      cardType: string | undefined;
      handle: string | undefined;
    } | undefined;
    additionalMetaTags: Array<{
      _type: "metaTag";
      metaAttributes: Array<{
        _type: "metaAttribute";
        attributeValueString: string | undefined;
        attributeType: "image" | "string" | undefined;
        attributeKey: string | undefined;
        attributeValueImage: {
          _type: "image";
          crop: {
            _type: "sanity.imageCrop";
            right: number | undefined;
            top: number | undefined;
            left: number | undefined;
            bottom: number | undefined;
          } | undefined;
          hotspot: {
            _type: "sanity.imageHotspot";
            x: number | undefined;
            y: number | undefined;
            height: number | undefined;
            width: number | undefined;
          } | undefined;
          asset: {
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
          } | undefined;
        } | undefined;
      }> | undefined;
    }> | undefined;
  }