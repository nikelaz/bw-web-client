import { serviceUrl } from '@/config';

class User {
  static async login(email: string, password: string) {
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        }
      })
    };

    const req = await fetch(`http://localhost:3001/api/v1/users/login`, reqOptions);

    const jsonResponse = await req.json();

    // if (req.status !== 200) {
    //   throw new Error(jsonResponse.message);
    // }

    return jsonResponse;
  }
}

export default User;
