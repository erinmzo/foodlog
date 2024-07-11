type GetUserType = {
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string | null;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: { provider: string; providers: [] };
    user_metadata: {
      display_name: string;
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    identities: [];
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
  };
};
