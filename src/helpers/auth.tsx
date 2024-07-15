import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const useAuth = () => {
  const token = cookies().get('token')?.value;
  let user = cookies().get('user')?.value;

  if (!token || !user) redirect('/login');

  user = JSON.parse(user);

  return [user, token];
};
