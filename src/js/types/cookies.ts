export enum CookieCategory {
    required = 'required',
    marketing = 'marketing',
    analytics = 'analytics',
    functional = 'functional',
}

export type CookieCategorySettings =
    | {
          [key in CookieCategory]?: boolean;
      }
    | undefined;
