class TokenStore {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = `Token ${token}`;
  }

  getToken(): string | null {
    return this.token;
  }

  deleteToken(): void {
    this.token = null;
  }
}

export const tokenStore = new TokenStore();
