import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { ApiError, NetworkError, signIn, signUp } from '@/api/client';
import type { AuthSuccess } from '@/api/types';
import { Mascot } from '@/components/Mascot';
import { useT } from '@/i18n';

type Mode = 'sign-in' | 'sign-up';

type Props = {
  onAuthed: (result: AuthSuccess, mode: Mode) => void;
};

export function AuthScreen({ onAuthed }: Props) {
  const t = useT();
  const [mode, setMode] = useState<Mode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const submit = async () => {
    if (loading) return;
    setError(null);

    if (!email.trim() || !password) {
      setError(t('auth.error.missing'));
      return;
    }
    if (mode === 'sign-up' && password.length < 8) {
      setError(t('auth.error.shortPassword'));
      return;
    }

    setLoading(true);
    try {
      const result =
        mode === 'sign-up'
          ? await signUp({
              email: email.trim(),
              password,
              name: name.trim() || email.trim().split('@')[0],
            })
          : await signIn({ email: email.trim(), password });
      onAuthed(result, mode);
    } catch (e) {
      if (e instanceof NetworkError) {
        setError(e.message);
      } else if (e instanceof ApiError) {
        setError(e.friendly);
      } else {
        setError(t('auth.error.generic'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollInner}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.art}>
          <View style={styles.artBg} />
          <Mascot size={88} />
        </View>

        <Text style={styles.title}>{t('auth.welcome')}</Text>
        <Text style={styles.subtitle}>{t('auth.subtitle')}</Text>

        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, mode === 'sign-in' && styles.tabActive]}
            onPress={() => {
              setMode('sign-in');
              setError(null);
            }}
          >
            <Text style={[styles.tabText, mode === 'sign-in' && styles.tabTextActive]}>
              {t('auth.tab.signIn')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, mode === 'sign-up' && styles.tabActive]}
            onPress={() => {
              setMode('sign-up');
              setError(null);
            }}
          >
            <Text style={[styles.tabText, mode === 'sign-up' && styles.tabTextActive]}>
              {t('auth.tab.signUp')}
            </Text>
          </Pressable>
        </View>

        {mode === 'sign-up' && (
          <Field
            label={t('auth.field.name')}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="name"
            placeholder={t('auth.placeholder.name')}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        )}

        <Field
          ref={emailRef}
          label={t('auth.field.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder={t('auth.placeholder.email')}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <Field
          ref={passwordRef}
          label={t('auth.field.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={mode === 'sign-up' ? 'newPassword' : 'password'}
          placeholder={mode === 'sign-up' ? t('auth.placeholder.passwordSignUp') : ''}
          onSubmitEditing={submit}
          returnKeyType="go"
        />

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Pressable
          style={[styles.cta, loading && styles.ctaDisabled]}
          onPress={submit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.ctaText}>
              {mode === 'sign-up' ? t('auth.cta.signUp') : t('auth.cta.signIn')}
            </Text>
          )}
        </Pressable>

        <Text style={styles.fineprint}>
          {mode === 'sign-up' ? t('auth.fineprint.signUp') : t('auth.fineprint.signIn')}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = React.ComponentProps<typeof TextInput> & { label: string };

const Field = ({ label, ref, ...props }: FieldProps & { ref?: React.Ref<TextInput> }) => {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        ref={ref}
        {...props}
        style={styles.fieldInput}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scrollInner: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },

  art: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
    marginTop: 8,
    marginBottom: 12,
    position: 'relative',
  },
  artBg: {
    position: 'absolute',
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.butterSoft,
    opacity: 0.7,
  },

  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink2,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 12,
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.paper,
  },
  tabText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.muted,
    letterSpacing: -0.1,
  },
  tabTextActive: {
    color: colors.ink,
  },

  field: { marginBottom: 14 },
  fieldLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  fieldInput: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 14,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },

  errorBox: {
    padding: 12,
    backgroundColor: colors.berrySoft,
    borderRadius: 12,
    marginBottom: 12,
  },
  errorText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.berry,
    lineHeight: 18,
  },

  cta: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  ctaDisabled: {
    backgroundColor: colors.line,
  },
  ctaText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  fineprint: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
    paddingHorizontal: 20,
  },
});
