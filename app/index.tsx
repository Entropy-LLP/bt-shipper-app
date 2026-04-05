import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(auth)/phone');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Truck icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.truckIcon}>🚛</Text>
          <View style={styles.truckGlow} />
        </View>

        {/* Wordmark */}
        <View style={styles.wordmarkRow}>
          <Text style={styles.wordmarkBharat}>Bharat</Text>
          <Text style={styles.wordmarkTruck}>Truck</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>India ka smarter freight</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Powered by LogisticOS</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckIcon: {
    fontSize: 72,
    lineHeight: 88,
  },
  truckGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F97316',
    opacity: 0.12,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  wordmarkBharat: {
    fontSize: 40,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  wordmarkTruck: {
    fontSize: 40,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#F97316',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#888888',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#444444',
    letterSpacing: 0.5,
  },
});
