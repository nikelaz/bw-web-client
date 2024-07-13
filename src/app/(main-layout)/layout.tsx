import {
  MainLayout,
  MainLayoutContainer,
  SidebarNav,
  SidebarNavLogo,
} from '@nikelaz/bw-ui';
import NavLinks from './nav-links';

type LayoutProps = Readonly<{
  children: React.ReactNode
}>;

const RootLayout = (props: LayoutProps) => {  
  return (
    <MainLayout>
      <SidebarNav>
        <SidebarNavLogo />
        <NavLinks />
      </SidebarNav>
      <MainLayoutContainer>
        {props.children}
      </MainLayoutContainer>
    </MainLayout>
  )
};

export default RootLayout;
