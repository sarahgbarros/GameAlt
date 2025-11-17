interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export const authService = {
  login: async ({
    email,
    password,
  }: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || "Login failed";
      throw new Error(errorMessage);
    }

    return response.json();
  },
  register: async ({
    name,
    email,
    password,
  }: RegisterCredentials): Promise<UserResponse> => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || "Registration failed";
      throw new Error(errorMessage);
    }
    return response.json();
  },
};
