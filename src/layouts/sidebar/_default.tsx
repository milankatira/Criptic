import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import { menuItems } from '@/layouts/sidebar/_menu-items';
import cn from 'classnames';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'ml-auto top-0 z-40 w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark',
        className
      )}
    >
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-5 2xl:px-8">
          <div className="mt-12 flex justify-end">
            {menuItems.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}
