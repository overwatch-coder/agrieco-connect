// === AUTH ===
declare interface IAuth {
  access_token: string;
  user: IAuthUser;
}

declare interface IAuthUser {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
  fullname: string;
}

// === FEEDS ===
declare interface IFeeds {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  images: string;
  is_active: boolean;
  topics: ITopic[];
}

declare interface ITopic {
  id: number;
  name: string;
  description: null | string;
}
