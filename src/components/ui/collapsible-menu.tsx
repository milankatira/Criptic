import ActiveLink from '@/components/ui/links/active-link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

type MenuItemProps = {
  name?: string;
  href: string;
};


export function MenuItem({ name, href }: MenuItemProps) {
  const router = useRouter();
  const {
    pathname,
  } = router;

  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      {
        <ActiveLink
          href={{
            pathname: href,
          }}
          className="relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white"
          activeClassName="!text-white"
        >
          <span className="relative z-[1]"> {name}</span>

          {href === pathname && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large"
              layoutId="menu-item-active-indicator"
            />
          )}
        </ActiveLink>
      }
    </div>
  );
}
