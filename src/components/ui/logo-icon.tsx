import Image from '@/components/ui/image';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/logo-icon.svg';
import darkLogo from '@/assets/images/logo-icon-white.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const { isDarkMode } = useIsDarkMode();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isDarkMode && (
          <Image src={darkLogo} alt="Criptic" priority />
        )}
        { !isDarkMode && (
          <Image src={lightLogo} alt="Criptic" priority />
        )}
      </span>
    </div>
  );
};

export default Logo;
