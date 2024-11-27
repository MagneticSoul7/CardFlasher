import { jwtDecode } from 'jwt-decode';

class AuthService {
    
  // Decode the token and return the user data
  getProfile() {
    try {
      const token = this.getToken();
      const decoded = jwtDecode(token);

      // Match backend structure: { data: { _id, username } }
      return decoded?.data || null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      if (!token) {
        console.error('No token provided');
        return true; // Treat as expired if no token is provided
      }

      const decoded = jwtDecode(token);

      // Ensure the token has the expected structure
      if (!decoded.exp) {
        console.error('Invalid token: Missing expiration field');
        return true; // Treat as expired if no expiration field
      }

      // Check if the current time is past the expiration time
      const isExpired = decoded.exp < Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
      if (isExpired) {
        console.log('Token is expired');
      }

      return isExpired;
    } catch (err) {
      console.error('Error decoding token:', err);
      return true; // Assume expired if there's an error
    }
  }


  // Retrieve the token from localStorage
  getToken() {
    try {
      return localStorage.getItem('token') || '';
    } catch (err) {
      console.error('Error retrieving token:', err);
      return '';
    }
  }

  // Store the token and redirect to a specified location
  login(idToken, navigate) {
    try {
      localStorage.setItem('token', idToken);
      navigate('/home');
    } catch (err) {
      console.error('Error during login:', err);
    }
  }

  // Remove the token and redirect to the login page
  logout(navigate) {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }

  // Verify if the token matches backend signing logic
  verifyToken() {
    const token = this.getToken();

    if (!token) {
      console.error('Token not found');
      return false;
    }

    try {
      const decoded = jwtDecode(token);

      // Backend's structure includes `data: { _id, username }`
      if (!decoded?.data || !decoded.data._id || !decoded.data.username) {
        console.error('Invalid token payload:', decoded);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error verifying token:', err);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
