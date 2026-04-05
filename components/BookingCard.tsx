import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

export type BookingStatus =
  | 'confirmed'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'pending';

export interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  status: BookingStatus;
  price: number;
  driverName: string;
  driverRating: number;
  vehicleType: string;
  bookingRef: string;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: 'Confirmed',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  pending: 'Pending',
};

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  compact?: boolean;
}

export default function BookingCard({ booking, onPress, compact }: BookingCardProps) {
  const { theme } = useTheme();

  const statusColor = () => {
    switch (booking.status) {
      case 'confirmed': return theme.accent;
      case 'in_transit': return '#3B82F6';
      case 'delivered': return theme.success;
      case 'cancelled': return theme.error;
      case 'pending': return theme.warning;
      default: return theme.textMuted;
    }
  };

  const statusBg = () => {
    switch (booking.status) {
      case 'confirmed': return theme.dark ? '#2C1A08' : '#FEF3E2';
      case 'in_transit': return theme.dark ? '#0D1B3E' : '#EFF6FF';
      case 'delivered': return theme.dark ? '#0A2E18' : '#F0FDF4';
      case 'cancelled': return theme.dark ? '#2C0A0A' : '#FEF2F2';
      case 'pending': return theme.dark ? '#2C2208' : '#FFFBEB';
      default: return theme.surfaceElevated;
    }
  };

  const stars = '★'.repeat(Math.floor(booking.driverRating)) + '☆'.repeat(5 - Math.floor(booking.driverRating));

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
        compact && styles.cardCompact,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: theme.accent }]} />
            <Text
              style={[styles.city, { color: theme.text }]}
              numberOfLines={1}
            >
              {booking.from}
            </Text>
          </View>
          <View style={[styles.vertLine, { borderColor: theme.border }]} />
          <View style={styles.routeRow}>
            <View style={[styles.dot, styles.dotSquare, { backgroundColor: theme.success }]} />
            <Text
              style={[styles.city, { color: theme.text }]}
              numberOfLines={1}
            >
              {booking.to}
            </Text>
          </View>
        </View>
        <View style={styles.priceBlock}>
          <Text style={[styles.price, { color: theme.accent }]}>
            ₹{booking.price.toLocaleString('en-IN')}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusBg() }]}>
            <Text style={[styles.statusText, { color: statusColor() }]}>
              {STATUS_LABELS[booking.status]}
            </Text>
          </View>
        </View>
      </View>

      {!compact && (
        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          <Text style={[styles.meta, { color: theme.textMuted }]}>
            {booking.date} · {booking.vehicleType}
          </Text>
          <Text style={[styles.driver, { color: theme.textMuted }]}>
            <Text style={{ color: theme.text }}>{booking.driverName}</Text>
            {'  '}
            <Text style={{ color: '#F59E0B' }}>{stars}</Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardCompact: {
    width: 220,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    justifyContent: 'space-between',
  },
  routeContainer: {
    flex: 1,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotSquare: {
    borderRadius: 2,
  },
  vertLine: {
    marginLeft: 3.5,
    height: 14,
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    marginVertical: 3,
  },
  city: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  priceBlock: {
    alignItems: 'flex-end',
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    letterSpacing: 0.3,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  driver: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});
