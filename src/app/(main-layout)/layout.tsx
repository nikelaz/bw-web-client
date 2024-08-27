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
  )
};

export default RootLayout;
