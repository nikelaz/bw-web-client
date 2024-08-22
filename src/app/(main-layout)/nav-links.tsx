// @TODO: Rework nav links to have a single focusable and clickable item
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavBtn, Icon, IconTypes } from '@nikelaz/bw-ui';
import { logout } from '@/actions/user-actions';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link href="/budget" className="w-full flex justify-center">
        <SidebarNavBtn
          label="Budget"
          isActive={pathname === '/budget'}
        >
          <Icon type={IconTypes.Wallet} width={24} height={24} fill="currentColor" />
        </SidebarNavBtn>
      </Link>
      <Link href="/settings" className="w-full flex justify-center">
        <SidebarNavBtn
          label="Settings"
          isActive={pathname === '/settings'}
        >
          <Icon type={IconTypes.Gear} width={27} height={24} fill="currentColor" />
        </SidebarNavBtn>
      </Link>
      <div className="w-full flex justify-center mt-auto">
        <SidebarNavBtn
          label="User Profile"
          onClick={() => logout()}
        >
          <Icon type={IconTypes.Logout} width={27} height={24} fill="currentColor" />
        </SidebarNavBtn>
      </div>
    </>
  );
};

export default NavLinks;
