import { COLORS } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ArrozConPollo() {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const ingredients = [
    '3 tazas de Arroz',
    '2 tazas de Pollo desmechado',
    '1/2 taza de Arvejas cocidas',
    '2 cdtas. de Aceite Vegetal',
    '1/2 taza de Cebolla Perla, picada en tiras',
    '1/2 taza de Pimiento Verde cortado en tiras',
    '1/2 taza de Zanahoria cortada en cubos pequeños',
    '2 sobres de condimento al gusto con achiote en polvo',
    '2 cdas. de Cilantro finamente picado',
    '4 porciones de Plátano Maduro frito (acompañamiento)',
  ];

  const steps = [
    'Prepara los ingredientes: Cocina el arroz en una olla con el refrito con achiote en polvo y reserva. Del mismo modo, una vez frío, desmenuza la carne de pollo cocida y reserva. Cocina y ten listas las arvejas.',
    'Prepara el refrito: Añade el aceite vegetal en una olla grande y, una vez caliente, agrega un sobre de condimento al gusto con achiote en polvo, la cebolla perla y el pimiento verde. Cocina durante 4 minutos. Luego, añade la zanahoria y continúa cocinando.',
    'Mezcla todo: Agrega el arroz cocido, el pollo desmenuzado y las arvejas cocidas en la olla con el refrito. Mezcla bien para incorporar todos los ingredientes de manera uniforme.',
    'Servir caliente y acompañar cada plato con las rodajas de plátano maduro frito y espolvorear el cilantro picado encima.',
  ];

  const toggleIngredient = (index: number) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      {isFocused && <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />}
      
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/arroz.jpg')}
          style={styles.imagen}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.titulo}>ARROZ CON POLLO</Text>
        
        <View style={styles.titleBar} />

        <View style={styles.badgeRow}>
          <View style={styles.badgeItem}>
            <Ionicons name="time" size={18} color={COLORS.primary} />
            <Text style={styles.badgeTitle}>Prep.</Text>
            <Text style={styles.badgeVal}>40 min</Text>
          </View>
          <View style={styles.badgeItem}>
            <Ionicons name="flame" size={18} color={COLORS.secondary} />
            <Text style={styles.badgeTitle}>Dificultad</Text>
            <Text style={styles.badgeVal}>Fácil</Text>
          </View>
          <View style={styles.badgeItem}>
            <Ionicons name="people" size={18} color={COLORS.success} />
            <Text style={styles.badgeTitle}>Porciones</Text>
            <Text style={styles.badgeVal}>4 pers.</Text>
          </View>
        </View>

        <Text style={styles.subtitulo}>INGREDIENTES</Text>
        <Text style={styles.instructionText}>
          Toca los ingredientes para marcarlos como listos:
        </Text>

        <View style={styles.ingredientsList}>
          {ingredients.map((ingredient, index) => {
            const isChecked = checkedIngredients.includes(index);
            return (
              <Pressable
                key={index}
                onPress={() => toggleIngredient(index)}
                style={({ pressed }) => [
                  styles.ingredientItem,
                  isChecked && styles.ingredientItemChecked,
                  pressed && styles.pressedEffect,
                ]}
              >
                <Ionicons
                  name={isChecked ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={isChecked ? COLORS.primary : COLORS.textMuted}
                />
                <Text
                  style={[
                    styles.ingredientText,
                    isChecked && styles.ingredientTextChecked,
                  ]}
                >
                  {ingredient}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.subtitulo}>PREPARACIÓN</Text>

        <View style={styles.stepsList}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    width: '100%',
    height: 280,
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleBar: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeItem: {
    alignItems: 'center',
    flex: 1,
  },
  badgeTitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeVal: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '800',
    marginTop: 2,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 15,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  instructionText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  ingredientsList: {
    marginBottom: 25,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  ingredientItemChecked: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  pressedEffect: {
    opacity: 0.8,
  },
  ingredientText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
  },
  ingredientTextChecked: {
    color: COLORS.primary,
    textDecorationLine: 'line-through',
  },
  stepsList: {
    marginTop: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  stepNumberContainer: {
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  stepNumber: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
    fontWeight: '500',
  },
});