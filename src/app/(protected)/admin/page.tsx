import { auth } from '@/auth';
import AdminPageClient from './_components/adminPageClient';

const AdminPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const newUser = {
  name: user.name || 'No name',
  email: user.email || 'no@email.com' ,
  role: user.role || "user" ,
  isTwoFactorEnabled: user.isTwoFactorEnabled || false , 
  }
  
  // console.log("Session : ", JSON.stringify(session));

  return <AdminPageClient user={newUser} />;
};

export default AdminPage;