import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

type Level = 1 | 2 | 3;

interface TierBadgeProps {
  level: Level;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const TIER_CONFIG = {
  1: { label: 'Level 1', bg: '#1C1C1C', color: '#888888', border: '#333333', emoji: '🔓' },
  2: { label: 'Level 2', bg: '#1A1400', color: '#EAB308', border: '#3D3100', emoji: '⚡' },
  3: { label: 'Level 3', bg: '#0A1F0A', color: '#22C55E', border: '#1A3D1A', emoji: '✦' },
};

const TIER_CONFIG_LIGHT = {
  1: { label: 'Level 1', bg: '#F4F4F5', color: '#71717A', border: '#E4E4E7', emoji: '🔓' },
  2: { label: 'Level 2', bg: '#FFFBEB', color: '#CA8A04', border: '#FDE68A', emoji: '⚡' },
  3: { label: 'Level 3', bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0', emoji: '✦' },
};

export default function TierBadge({ level, showLabel = true, size = 'medium' }: TierBadgeProps) {
  const { isDark } = useTheme();
  const config = (isDark ? TIER_CONFIG : TIER_CONFIG_LIGHT)[level];

  const padding = size === 'small'
    ? { paddingHorizontal: 8, paddingVertical: 3 }
    : size === 'large'
    ? { paddingHorizontal: 14, paddingVertical: 7 }
    : { paddingHorizontal: 10, paddingVertical: 4 };

  const fontSize = size === 'small' ? 11 : size === 'large' ? 14 : 12;

  return (
    <View
      style={[
        styles.badge,
        padding,
        { backgroundColor: config.bg, borderColor: config.border },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: fontSize - 1 }]}>{config.emoji}</Text>
      {showLabel && (
        <Text style={[styles.label, { color: config.color, fontSize }]}>
          {config.label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  emoji: {
    lineHeight: 18,
  },
  label: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    letterSpacing: 0.3,
  },
});
