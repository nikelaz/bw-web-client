import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const useAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user = cookieStore.get('user')?.value;

  if (!token || !user) redirect('/login');

  user = JSON.parse(user);

  return [token, user];
};
