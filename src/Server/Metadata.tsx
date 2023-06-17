import { FunctionComponent } from 'react';

export interface Title {
  children?: string;
}

export interface Meta {
  name: string;
  content: string;
}

export interface Metadata {
  title?: string;
  meta?: {
    [key: string]: string;
  };
}

export const metadata: Metadata = {
  title: '',
  meta: {}
}

export const Title: FunctionComponent<Title> = ({
  children
}) => {
  metadata.title = children.toString();
  return <></>;
}

export const Meta: FunctionComponent<Meta> = ({
  name,
  content
}) => {
  metadata.meta[name] = content;
  return <></>;
}
