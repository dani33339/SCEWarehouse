import { fetchUserData } from './fetchLocalStorageData';

describe('fetchUserData function', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('returns null when localStorage is empty', () => {
    const userData = fetchUserData();
    expect(userData).toBeNull();
  });

  it('returns parsed user data when localStorage contains valid data', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(user));

    const userData = fetchUserData();
    expect(userData).toEqual(user);
  });

});
