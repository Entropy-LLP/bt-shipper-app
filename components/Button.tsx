import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from './ThemeContext';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'large' | 'medium' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const { theme } = useTheme();

  const containerStyle: ViewStyle[] = [
    styles.base,
    size === 'large' && styles.large,
    size === 'medium' && styles.medium,
    size === 'small' && styles.small,
    fullWidth && styles.fullWidth,
    variant === 'primary' && { backgroundColor: theme.accent },
    variant === 'secondary' && {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: theme.accent,
    },
    variant === 'ghost' && { backgroundColor: 'transparent' },
    (disabled || loading) && styles.disabled,
    style as ViewStyle,
  ].filter(Boolean) as ViewStyle[];

  const labelStyle: TextStyle[] = [
    styles.label,
    size === 'large' && styles.labelLarge,
    size === 'medium' && styles.labelMedium,
    size === 'small' && styles.labelSmall,
    variant === 'primary' && { color: '#FFFFFF' },
    variant === 'secondary' && { color: theme.accent },
    variant === 'ghost' && { color: theme.textMuted },
    textStyle as TextStyle,
  ].filter(Boolean) as TextStyle[];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : theme.accent} />
      ) : (
        <Text style={labelStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    letterSpacing: 0.2,
  },
  labelLarge: {
    fontSize: 16,
  },
  labelMedium: {
    fontSize: 15,
  },
  labelSmall: {
    fontSize: 13,
  },
});
