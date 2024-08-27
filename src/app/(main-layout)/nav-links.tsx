'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavBtn, Icon, IconTypes } from '@nikelaz/bw-ui';
import { logout } from '@/actions/user-actions';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarNavBtn
        component={Link}
        href="/budget"
        className="w-full flex justify-center"
        label="Budget"
        isActive={pathname === '/budget'}
        icon={IconTypes.Wallet}
      />
      <div className="w-full xl:hidden">
        <SidebarNavBtn
          component={Link}
          href="/reporting"
          className="w-full flex justify-center"
          label="Reporting"
          isActive={pathname === '/reporting'}
          icon={IconTypes.Chart}
        />
      </div>
      <div className="w-full xl:hidden">
        <SidebarNavBtn
          component={Link}
          href="/transactions"
          className="w-full flex justify-center"
          label="Transactions"
          isActive={pathname === '/transactions'}
          icon={IconTypes.CreditCard}
        />
      </div>
      <SidebarNavBtn
        component={Link}
        href="/settings"
        className="w-full flex justify-center"
        label="Settings"
        isActive={pathname === '/settings'}
        icon={IconTypes.Gear}
      />
      <div className="w-full mt-auto hidden md:block">
        <SidebarNavBtn
          className="w-full flex justify-center"
          label="Logout"
          onClick={() => logout()}
          icon={IconTypes.Logout}
        />
      </div>
    </>
  );
};

export default NavLinks;
