import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  radius?: 'sm' | 'md' | 'lg';
  icon?: string;
  type?: 'solid' | 'outline';
  colour?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  icon,
  radius = 'sm',
  type = 'solid',
  colour = 'primary',
}) => {
  const colours = {
    primary: 'bg-[#C4A1FF]',
    secondary: 'bg-[#FFC4A1]',
    danger: 'bg-[#FFA1A1]',
    warning: 'bg-[#FFD700]',
    success: 'bg-[#7CFC00]',
  };
  const defaultClasses =
    'flex cursor-pointer items-center rounded-md border-2 border-black px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none';
  const _renderIcon = (icon: string) =>
    icon && <MaterialIcons name="dangerous" size={28} color="white" />;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge(defaultClasses, colours[colour])}
    >
      <View>
        {_renderIcon(icon)}
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
