import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  radius?: 'sm' | 'md' | 'lg';
  icon?: string;
  type?: 'solid' | 'outline';
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  icon,
  radius = 'sm',
  type = 'solid',
  color = 'primary',
}) => {
  const _renderIcon = (icon: string) =>
    icon && <MaterialIcons name="dangerous" size={28} color="white" />;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex cursor-pointer items-center rounded-md border-2 border-black bg-[#C4A1FF] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
    >
      <View>
        {_renderIcon(icon)}
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
