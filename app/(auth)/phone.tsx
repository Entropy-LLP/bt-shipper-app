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

export default function PhoneScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({ pathname: '/(auth)/otp', params: { phone } });
    }, 1200);
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
          {/* Logo wordmark */}
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>
              <Text style={{ color: '#FFFFFF' }}>Bharat</Text>
              <Text style={{ color: theme.accent }}>Truck</Text>
            </Text>
          </View>

          <View style={styles.body}>
            <Text style={[styles.heading, { color: theme.text }]}>
              Enter your phone number
            </Text>
            <Text style={[styles.subheading, { color: theme.textMuted }]}>
              We'll send a one-time password to verify your number
            </Text>

            <View style={[styles.phoneRow, { borderColor: theme.border, backgroundColor: theme.surfaceElevated }]}>
              <View style={[styles.prefix, { borderRightColor: theme.border }]}>
                <Text style={[styles.flag]}>🇮🇳</Text>
                <Text style={[styles.prefixText, { color: theme.text }]}>+91</Text>
              </View>
              <Input
                value={phone}
                onChangeText={(t) => {
                  setPhone(t.replace(/\D/g, '').slice(0, 10));
                  setError('');
                }}
                placeholder="98765 43210"
                keyboardType="phone-pad"
                maxLength={10}
                containerStyle={styles.phoneInput}
                style={{ paddingLeft: 0 }}
                error={error}
              />
            </View>
            {error ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
            ) : null}

            <Button
              title="Send OTP"
              onPress={handleSendOTP}
              loading={loading}
              disabled={phone.length < 10}
              style={{ marginTop: 8 }}
            />

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              <Text style={[styles.dividerText, { color: theme.textMuted }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            </View>

            <TouchableOpacity style={styles.whatsappRow} onPress={() => {}}>
              <Text style={styles.waIcon}>💬</Text>
              <Text style={[styles.waText, { color: theme.textMuted }]}>
                Book via WhatsApp{' '}
                <Text style={{ color: theme.accent }}>→</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.tos, { color: theme.textMuted }]}>
            By continuing, you agree to our{' '}
            <Text style={{ color: theme.accent }}>Terms</Text>
            {' & '}
            <Text style={{ color: theme.accent }}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24 },
  logoRow: { alignItems: 'center', marginTop: 16, marginBottom: 48 },
  logoText: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  body: { flex: 1 },
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
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 0,
    overflow: 'hidden',
  },
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 6,
    borderRightWidth: 1.5,
    height: 52,
  },
  flag: { fontSize: 18 },
  prefixText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: 6,
    marginBottom: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  waIcon: { fontSize: 18 },
  waText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  tos: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    lineHeight: 18,
    marginTop: 'auto',
    paddingTop: 24,
  },
});
