import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/ThemeContext';
import TierBadge from '../../components/TierBadge';
import BookingCard from '../../components/BookingCard';
import Button from '../../components/Button';
import { MOCK_USER, MOCK_BOOKINGS } from '../../lib/mockData';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const user = MOCK_USER;
  const recentBookings = MOCK_BOOKINGS.slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user.name.split(' ')[0];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textMuted }]}>
              {greeting},
            </Text>
            <Text style={[styles.name, { color: theme.text }]}>{firstName} 👋</Text>
          </View>
          <TierBadge level={user.level} size="medium" />
        </View>

        {/* Level 1 upgrade banner */}
        {user.level === 1 && (
          <TouchableOpacity
            style={[styles.upgradeBanner, { backgroundColor: '#2C1A08', borderColor: '#F97316' }]}
            onPress={() => router.push('/kyc/level2')}
            activeOpacity={0.8}
          >
            <Text style={styles.upgradeEmoji}>⚡</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.upgradeTitle, { color: '#FED7AA' }]}>
                Upgrade to book trucks
              </Text>
              <Text style={[styles.upgradeSub, { color: '#F97316' }]}>
                Add Aadhaar + PAN to unlock Level 2 →
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Big Book a Truck CTA */}
        <TouchableOpacity
          style={styles.bookCta}
          onPress={() => router.push('/book/route')}
          activeOpacity={0.9}
        >
          <View style={styles.bookCtaInner}>
            <View>
              <Text style={styles.bookCtaLabel}>Ready to ship?</Text>
              <Text style={styles.bookCtaTitle}>Book a Truck</Text>
              <Text style={styles.bookCtaSub}>Get quotes in 60 seconds</Text>
            </View>
            <Text style={styles.bookCtaTruck}>🚛</Text>
          </View>
          <View style={styles.bookCtaArrow}>
            <Text style={styles.bookCtaArrowText}>Tap to start →</Text>
          </View>
        </TouchableOpacity>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.success }]}>
              ₹{user.totalSaved.toLocaleString('en-IN')}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Saved vs market</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.accent }]}>
              {user.totalTrips}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Trips done</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>
              4.8 ★
            </Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Avg driver</Text>
          </View>
        </View>

        {/* Recent bookings */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent shipments</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/bookings')}>
            <Text style={[styles.sectionLink, { color: theme.accent }]}>See all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentScroll}
        >
          {recentBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              compact
              onPress={() => router.push('/(tabs)/bookings')}
            />
          ))}
        </ScrollView>

        {/* Quick actions */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 12 }]}>
          Quick actions
        </Text>
        <View style={styles.quickActions}>
          {[
            { emoji: '🗺️', label: 'Get Quote', action: () => router.push('/book/route') },
            { emoji: '📍', label: 'Track', action: () => router.push('/(tabs)/track') },
            { emoji: '🆙', label: 'Upgrade KYC', action: () => router.push('/kyc/level2') },
            { emoji: '💬', label: 'Support', action: () => {} },
          ].map((qa) => (
            <TouchableOpacity
              key={qa.label}
              style={[styles.qaCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={qa.action}
              activeOpacity={0.75}
            >
              <Text style={styles.qaEmoji}>{qa.emoji}</Text>
              <Text style={[styles.qaLabel, { color: theme.text }]}>{qa.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  name: {
    fontSize: 22,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.3,
  },
  upgradeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 16,
  },
  upgradeEmoji: { fontSize: 22 },
  upgradeTitle: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    marginBottom: 2,
  },
  upgradeSub: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  bookCta: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F97316',
  },
  bookCtaInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  bookCtaLabel: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#FED7AA',
    marginBottom: 4,
  },
  bookCtaTitle: {
    fontSize: 26,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  bookCtaSub: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#FED7AA',
  },
  bookCtaTruck: { fontSize: 56 },
  bookCtaArrow: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookCtaArrowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_400Regular',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  recentScroll: {
    paddingRight: 4,
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  qaCard: {
    width: '47%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  qaEmoji: { fontSize: 28 },
  qaLabel: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
});
