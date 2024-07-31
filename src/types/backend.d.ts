// === AUTH ===
declare interface IAuth {
  user: IAuthUser;
}

declare interface IAuthUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  role: "admin" | "user";
  interested_topics: ITopic[];
  token: string;
  followers?: number;
}

// === FEEDS ===
declare interface IFeed {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  images: string;
  is_active: boolean;
  topics: ITopic[];
  likes: IFeedUser[];
  comments: IComment[];
  community_id?: number;
}

declare interface IComment {
  id: number;
  content: string;
  user: IFeedUser;
  feed_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

declare interface IFeedUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  followers: number;
}

declare interface ITopic {
  id: number;
  name: string;
  description: null | string;
}

declare interface ITrend {
  [key: string]: number;
}

// === MARKETPLACE ===
declare interface IMarketPlace {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// === EVENTS ===
declare interface IEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  location: string;
  image: string;
  user: IFeedUser;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// === COMMUNITY ===
declare interface ICommunity {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  owner: IFeedUser;
  members_count?: number;
  members_ids?: number[];
}

// === APPOINTMENTS ===
declare interface IAppointment {
  id: number;
  user: IFeedUser;
  company_name: string;
  specialty: string;
  location: string;
  experience_level: string;
  availability_slot_start: string;
  availability_slot_end: string;
  contact_information: null;
  bio: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_booked: boolean;
}
