import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/ThemeContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function EmailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleContinue = () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/tier-info');
    }, 900);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={[styles.backText, { color: theme.textMuted }]}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.body}>
            <Text style={styles.emailIcon}>✉️</Text>
            <Text style={[styles.heading, { color: theme.text }]}>
              Your email address
            </Text>
            <Text style={[styles.subheading, { color: theme.textMuted }]}>
              Shippers need an email for booking confirmations and invoices
            </Text>

            <Input
              label="Email address"
              value={email}
              onChangeText={(t) => { setEmail(t.trim()); setError(''); }}
              placeholder="you@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={error}
            />

            <View style={[styles.infoCard, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={[styles.infoText, { color: theme.textMuted }]}>
                Your email will be used for booking receipts, GST invoices, and account security.
              </Text>
            </View>

            <Button
              title="Continue"
              onPress={handleContinue}
              loading={loading}
              disabled={!isValidEmail(email)}
              style={{ marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24 },
  backBtn: { marginBottom: 24 },
  backText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  body: {},
  emailIcon: { fontSize: 40, marginBottom: 16 },
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
    marginBottom: 32,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoIcon: { fontSize: 16, marginTop: 1 },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_400Regular',
    lineHeight: 20,
  },
});
