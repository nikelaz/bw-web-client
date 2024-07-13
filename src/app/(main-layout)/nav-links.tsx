'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavBtn, Icon, IconTypes } from '@nikelaz/bw-ui';

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
      <Link href="#" className="w-full flex justify-center">
        <SidebarNavBtn
          label="User Profile"
        >
          <Icon type={IconTypes.User} width={27} height={24} fill="currentColor" />
        </SidebarNavBtn>
      </Link>
    </>
  );
};

export default NavLinks;
