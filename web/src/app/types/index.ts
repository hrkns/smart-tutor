export interface SearchQueryParameters {
  keywords: string;
  limit: number;
  exclude: string[];
}

export interface SimpleTopic {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  title: string;
}

export interface TopicCreationPayload {
  title: string;
  description?: string;
  content?: string;
  children?: string[];
}
