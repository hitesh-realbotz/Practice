import { Document } from '@contentful/rich-text-types';
import { EntrySkeletonType } from "contentful";

export type ExtendedBlogItem = BlogItem & EntrySkeletonType;

export type BlogItem = {
  fields: {
    title: string;
    slug: string;
    date: Date;
    content: Document;
  }
}

export type BlogItems = ReadonlyArray<BlogItem>;

export type BlogQueryResult = {
    items: BlogItems;
}

export type BlogPageProps = {
  params: {
    slug: string;
  };
};



//Manual Handling Contentful API response
export type BlogItemApiResponse = {
  metadata: {
    tags: string[];
  };
  sys: {
    space: {
      sys: any;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: any;
    };
    revision: number;
    contentType: {
      sys: any;
    };
    locale: string;
  };
  fields: BlogFields
}

export type BlogFields = {
  title: string;
  slug: string;
  date: Date;
  mainData: any;
  mainNodeType: string;
  contents: ContentArray[];
};

export type ContentArray = {
  nodeType: string;
  data: any;
  content: ContentField[];
}

export type ContentField = {
  nodeType: string;
  data: any;
  content: ContentField | ContentField[];
}



