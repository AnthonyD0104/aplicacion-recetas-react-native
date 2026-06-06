import { COLORS } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShadowVisible: false,
        headerTintColor: COLORS.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          color: COLORS.text,
        },
        headerLeft: ({ canGoBack }) => canGoBack ? (
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
                padding: 8,
                marginLeft: -8,
              }
            ]}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </Pressable>
        ) : null,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="encebollado"
        options={{
          title: "Encebollado",
        }}
      />
      <Stack.Screen
        name="lasagna"
        options={{
          title: "Lasaña",
        }}
      />
      <Stack.Screen
        name="arroz"
        options={{
          title: "Arroz con Pollo",
        }}
      />
    </Stack>
  );
}
