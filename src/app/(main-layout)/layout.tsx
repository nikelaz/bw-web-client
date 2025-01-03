import {
  MainLayout,
  MainLayoutContainer,
  SidebarNav,
  SidebarNavLogo,
} from '@nikelaz/bw-ui';
import NavLinks from './nav-links';
import { useAuth } from '@/helpers/auth';
import ModelsContainer from './budget/models-container';

type LayoutProps = Readonly<{
  children: React.ReactNode
}>;

const RootLayout = (props: LayoutProps) => {
  const [token, user] = useAuth();

  return (
    <ModelsContainer token={token} user={user}>
      <MainLayout>
        <div className="relative z-1">
          <SidebarNav>
            <SidebarNavLogo />
            <NavLinks />
          </SidebarNav>
        </div>
        <MainLayoutContainer>
          {props.children}
        </MainLayoutContainer>
      </MainLayout>
    </ModelsContainer>
  )
};

export default RootLayout;
