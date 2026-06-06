import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const categories = [
    { id: 1, name: "Toda la comida", icon: "restaurant" },
    { id: 2, name: "Rápidas", icon: "time-outline" },
    { id: 3, name: "Fácil", icon: "star-outline" },
    { id: 4, name: "Populares", icon: "flame-outline" },
  ];

  const recipes = [
    {
      id: "encebollado",
      title: "Encebollado",
      image: require('../assets/images/encebollado.jpg'),
      time: "60 min",
      timeVal: 60,
      difficulty: "Medio",
      isPopular: true,
      servings: "6 porc.",
      desc: "El plato típico de la costa ecuatoriana, un caldo de pescado delicioso.",
      route: "/encebollado",
    },
    {
      id: "lasagna",
      title: "Lasagna",
      image: require('../assets/images/lasagna.jpg'),
      time: "80 min",
      timeVal: 80,
      difficulty: "Medio",
      isPopular: true,
      servings: "6 porc.",
      desc: "Delicioso plato típico Italiano con carne molida y queso gratinado.",
      route: "/lasagna",
    },
    {
      id: "arroz",
      title: "Arroz con Pollo",
      image: require('../assets/images/arroz.jpg'),
      time: "40 min",
      timeVal: 40,
      difficulty: "Fácil",
      isPopular: false,
      servings: "4 porc.",
      desc: "Un platillo clasico lleno de sabor, vegetales y pollo desmenuzado.",
      route: "/arroz",
    },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedCategory === 1) return true;
    if (selectedCategory === 2) return recipe.timeVal <= 45; // Rápidas: 45 min o menos
    if (selectedCategory === 3) return recipe.difficulty === "Fácil"; // Fácil
    if (selectedCategory === 4) return recipe.isPopular; // Populares
    return true;
  });

  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {isFocused && <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />}
      
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroContainer, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroSub}>¿Qué vas a cocinar hoy?</Text>
          <Text style={styles.heroTitle}>RECETAS DE COCINA</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        <View style={styles.categoryWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive
                ]}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.id && styles.categoryTextActive
                  ]}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Platos Destacados</Text>

        {filteredRecipes.map((recipe) => (
          <Pressable
            key={recipe.id}
            onPress={() => router.push(recipe.route as any)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed
            ]}
          >
            <View style={styles.imageWrapper}>
              <Image source={recipe.image} style={styles.imagen} />
              
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>⏱️ {recipe.time}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: COLORS.secondary }]}>
                  <Text style={styles.badgeText}>🍳 {recipe.difficulty}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardInfo}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.nombre}>{recipe.title}</Text>
                <Text style={styles.servingsText}>👥 {recipe.servings}</Text>
              </View>
              
              <Text numberOfLines={2} style={styles.descText}>
                {recipe.desc}
              </Text>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <Text style={styles.viewRecipeText}>Ver Receta</Text>
                <View style={styles.actionButton}>
                  <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
        
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heroContent: {
    marginTop: 4,
  },
  heroSub: {
    fontSize: 12,
    color: '#FFE4E6',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryWrapper: {
    marginVertical: 15,
  },
  categoryContainer: {
    paddingVertical: 5,
  },
  categoryChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 5,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    position: 'relative',
    height: 190,
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  cardInfo: {
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  servingsText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  descText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRecipeText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
});