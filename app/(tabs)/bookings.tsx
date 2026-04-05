import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/ThemeContext';
import BookingCard, { Booking, BookingStatus } from '../../components/BookingCard';
import Button from '../../components/Button';
import { MOCK_BOOKINGS } from '../../lib/mockData';

type Tab = 'active' | 'past';

const ACTIVE_STATUSES: BookingStatus[] = ['confirmed', 'in_transit', 'pending'];
const PAST_STATUSES: BookingStatus[] = ['delivered', 'cancelled'];

export default function BookingsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('active');

  const filtered = MOCK_BOOKINGS.filter((b) =>
    activeTab === 'active'
      ? ACTIVE_STATUSES.includes(b.status)
      : PAST_STATUSES.includes(b.status)
  );

  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>{activeTab === 'active' ? '📦' : '📭'}</Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        {activeTab === 'active' ? 'No active shipments' : 'No past bookings yet'}
      </Text>
      <Text style={[styles.emptySub, { color: theme.textMuted }]}>
        {activeTab === 'active'
          ? 'Book your first truck to get started'
          : 'Your completed trips will appear here'}
      </Text>
      {activeTab === 'active' && (
        <Button
          title="Book a Truck"
          onPress={() => router.push('/book/route')}
          style={{ marginTop: 20 }}
          fullWidth={false}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Bookings</Text>
        <TouchableOpacity
          style={[styles.newBtn, { backgroundColor: theme.accent }]}
          onPress={() => router.push('/book/route')}
        >
          <Text style={styles.newBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { borderBottomColor: theme.border }]}>
        {(['active', 'past'] as Tab[]).map((tab) => {
          const count = MOCK_BOOKINGS.filter((b) =>
            tab === 'active'
              ? ACTIVE_STATUSES.includes(b.status)
              : PAST_STATUSES.includes(b.status)
          ).length;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && { borderBottomColor: theme.accent, borderBottomWidth: 2 },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? theme.accent : theme.textMuted },
                ]}
              >
                {tab === 'active' ? 'Active' : 'Past'}
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: activeTab === tab ? theme.accent : theme.surfaceElevated,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: activeTab === tab ? '#fff' : theme.textMuted },
                  ]}
                >
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          filtered.length === 0 && styles.listEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => {
              if (item.status === 'in_transit') {
                router.push('/(tabs)/track');
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.3,
  },
  newBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  newBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  list: {
    padding: 20,
    paddingTop: 12,
  },
  listEmpty: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
