export type Profile = {
  id: string;
  full_name: string | null;
  company: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactInquiry = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  message: string;
  status: "new" | "reviewed" | "closed";
  created_at: string;
};
