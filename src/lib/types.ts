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
  email: string | null;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: "new" | "reviewed" | "closed";
  created_at: string;
};

export function isAdminRole(role: string | null | undefined) {
  return role === "admin";
}
