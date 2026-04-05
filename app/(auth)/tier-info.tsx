import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/ThemeContext';
import Button from '../../components/Button';

const TIERS = [
  {
    level: 1,
    emoji: '🔓',
    title: 'Level 1 — Basic',
    subtitle: 'Phone + Email verified',
    color: '#888888',
    bgDark: '#1C1C1C',
    bgLight: '#F4F4F5',
    borderDark: '#2A2A2A',
    borderLight: '#E4E4E7',
    perks: [
      { icon: '💬', text: 'Get instant quotes for any route' },
      { icon: '📞', text: 'Contact our support team' },
      { icon: '📍', text: 'Browse truck availability' },
    ],
    locked: ['Book trucks', 'Pay online', 'GST invoices'],
  },
  {
    level: 2,
    emoji: '⚡',
    title: 'Level 2 — Verified',
    subtitle: 'Aadhaar + PAN verified',
    color: '#EAB308',
    bgDark: '#1A1400',
    bgLight: '#FFFBEB',
    borderDark: '#3D3100',
    borderLight: '#FDE68A',
    perks: [
      { icon: '🚛', text: 'Book trucks up to ₹50,000' },
      { icon: '💳', text: 'Pay online — UPI, card, net banking' },
      { icon: '🧾', text: 'GST invoices for each booking' },
    ],
    locked: ['Unlimited bookings', 'Credit terms'],
  },
  {
    level: 3,
    emoji: '✦',
    title: 'Level 3 — Business',
    subtitle: 'GST + Company PAN verified',
    color: '#22C55E',
    bgDark: '#0A2E18',
    bgLight: '#F0FDF4',
    borderDark: '#1A3D1A',
    borderLight: '#BBF7D0',
    perks: [
      { icon: '♾️', text: 'Unlimited booking value' },
      { icon: '📊', text: 'Business dashboard & analytics' },
      { icon: '💼', text: '30-day credit terms available' },
      { icon: '🤝', text: 'Dedicated account manager' },
    ],
    locked: [],
  },
];

export default function TierInfoScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.heading, { color: theme.text }]}>
            How BharatTruck works
          </Text>
          <Text style={[styles.subheading, { color: theme.textMuted }]}>
            Start immediately with Level 1. Upgrade anytime to unlock more.
          </Text>
        </View>

        {TIERS.map((tier) => (
          <View
            key={tier.level}
            style={[
              styles.tierCard,
              {
                backgroundColor: isDark ? tier.bgDark : tier.bgLight,
                borderColor: isDark ? tier.borderDark : tier.borderLight,
              },
            ]}
          >
            <View style={styles.tierHeader}>
              <View style={styles.tierTitleRow}>
                <Text style={styles.tierEmoji}>{tier.emoji}</Text>
                <View>
                  <Text style={[styles.tierTitle, { color: tier.color }]}>{tier.title}</Text>
                  <Text style={[styles.tierSub, { color: theme.textMuted }]}>{tier.subtitle}</Text>
                </View>
              </View>
              {tier.level === 1 && (
                <View style={[styles.currentBadge, { backgroundColor: tier.color + '20', borderColor: tier.color + '40' }]}>
                  <Text style={[styles.currentBadgeText, { color: tier.color }]}>Your start</Text>
                </View>
              )}
            </View>

            <View style={[styles.divider, { backgroundColor: isDark ? tier.borderDark : tier.borderLight }]} />

            <View style={styles.perks}>
              {tier.perks.map((perk, i) => (
                <View key={i} style={styles.perkRow}>
                  <Text style={styles.perkIcon}>{perk.icon}</Text>
                  <Text style={[styles.perkText, { color: theme.text }]}>{perk.text}</Text>
                </View>
              ))}
              {tier.locked.length > 0 && (
                <>
                  <View style={[styles.lockedDivider, { backgroundColor: theme.border }]} />
                  {tier.locked.map((l, i) => (
                    <View key={i} style={styles.perkRow}>
                      <Text style={[styles.perkIcon, { opacity: 0.4 }]}>🔒</Text>
                      <Text style={[styles.perkText, { color: theme.textMuted, textDecorationLine: 'line-through' }]}>
                        {l}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        ))}

        <Button
          title="Start with Level 1  →"
          onPress={() => router.replace('/(tabs)')}
          style={{ marginTop: 8, marginBottom: 8 }}
        />
        <Text style={[styles.footer, { color: theme.textMuted }]}>
          You can upgrade your level at any time from your profile
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 24, gap: 12 },
  header: { marginBottom: 8 },
  heading: {
    fontSize: 26,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_400Regular',
    lineHeight: 22,
  },
  tierCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 4,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tierEmoji: { fontSize: 28 },
  tierTitle: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  tierSub: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: 2,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  currentBadgeText: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  perks: { gap: 10 },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perkIcon: { fontSize: 16, width: 22 },
  perkText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    flex: 1,
  },
  lockedDivider: {
    height: 1,
    marginVertical: 6,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    lineHeight: 18,
    marginBottom: 12,
  },
});
