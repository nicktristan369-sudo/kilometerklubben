export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  distance: string | null;
  difficulty: "beginner" | "intermediate" | "advanced" | "ultra" | null;
  price: number; // in øre
  max_spots: number;
  image_url: string | null;
  tag: string | null;
  route_coordinates: unknown | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventWithSpots extends Event {
  spots_left: number;
  registered_count: number;
}

export interface Registration {
  id: string;
  event_id: string;
  user_id: string;
  status: "confirmed" | "cancelled" | "waitlist";
  notes: string | null;
  created_at: string;
}

export interface RegistrationWithDetails extends Registration {
  profiles: Profile;
  events: Event;
}
