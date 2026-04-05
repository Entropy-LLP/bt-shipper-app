import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../components/ThemeContext';
import Button from '../../components/Button';

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (val: string, idx: number) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    setError('');
    if (digit && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
    if (!digit && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/email');
    }, 1200);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setCountdown(60);
    inputs.current[0]?.focus();
  };

  const isComplete = otp.every((d) => d !== '');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={[styles.backText, { color: theme.textMuted }]}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.body}>
            <Text style={styles.lockIcon}>🔐</Text>
            <Text style={[styles.heading, { color: theme.text }]}>
              Verify your number
            </Text>
            <Text style={[styles.subheading, { color: theme.textMuted }]}>
              We sent a 6-digit OTP to{'\n'}
              <Text style={{ color: theme.text, fontFamily: 'SpaceGrotesk_600SemiBold' }}>
                +91 {phone}
              </Text>
            </Text>

            {/* OTP Boxes */}
            <View style={styles.otpRow}>
              {otp.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={(r) => { inputs.current[idx] = r; }}
                  style={[
                    styles.otpBox,
                    {
                      backgroundColor: theme.surfaceElevated,
                      borderColor: digit
                        ? theme.accent
                        : error
                        ? theme.error
                        : theme.border,
                      color: theme.text,
                      fontFamily: 'SpaceGrotesk_700Bold',
                    },
                  ]}
                  value={digit}
                  onChangeText={(v) => handleChange(v, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                />
              ))}
            </View>

            {error ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
            ) : null}

            <Button
              title="Verify OTP"
              onPress={handleVerify}
              loading={loading}
              disabled={!isComplete}
              style={{ marginTop: 24 }}
            />

            <View style={styles.resendRow}>
              {countdown > 0 ? (
                <Text style={[styles.resendText, { color: theme.textMuted }]}>
                  Resend OTP in{' '}
                  <Text style={{ color: theme.text }}>0:{countdown.toString().padStart(2, '0')}</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={[styles.resendLink, { color: theme.accent }]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={[styles.hint, { color: theme.textMuted }]}>
              Tip: For testing, any 6-digit code works
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 24 },
  backBtn: { marginBottom: 32 },
  backText: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  body: { alignItems: 'center' },
  lockIcon: { fontSize: 48, marginBottom: 16 },
  heading: {
    fontSize: 26,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_400Regular',
    lineHeight: 22,
    marginBottom: 36,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 22,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  resendRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  resendLink: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  hint: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
});
