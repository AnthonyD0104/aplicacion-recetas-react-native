import { COLORS } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Lasagna() {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const ingredients = [
    '2 cdas. de aceite de oliva (para el Ragú)',
    '100 g de tocino ahumado picado (para el Ragú)',
    '1 cebolla perla picada y 2 dientes de ajo (para el Ragú)',
    '1/2 taza de zanahoria y 1/2 rama de apio en cuadritos (para el Ragú)',
    '1/2 kilo de carne picada en cuadritos (pajarilla) (para el Ragú)',
    '1/2 cdta. de orégano, 3 hojas de laurel y sal/pimienta al gusto (para el Ragú)',
    '4 tomates maduros picados y 150 g de pasta de tomate (para el Ragú)',
    '1 taza de agua, caldo o vino (para el Ragú)',
    '60 g de mantequilla sin sal (para la Salsa Blanca)',
    '5 cdas. de harina sin polvos de hornear (para la Salsa Blanca)',
    '3 tazas de leche entera (para la Salsa Blanca)',
    'Sal, pimienta y nuez moscada al gusto (para la Salsa Blanca)',
    '12 láminas de masa para lasaña cocinadas al dente',
    '300 g de queso mozzarella rallado (para armar)',
    '150 g de queso parmesano rallado (para armar)',
  ];

  const steps = [
    'Preparar el Ragú: En una cacerola, calentar el aceite y dorar el tocino. Añadir la cebolla, ajo, zanahoria y apio con sal y pimienta hasta ablandar.',
    'Agregar la carne picada con el orégano y el laurel. Cocinar hasta que cambie de color. Incorporar los tomates, la pasta de tomate y el líquido. Tapar y dejar cocinar a fuego lento hasta que espese y concentre el sabor.',
    'Preparar la Salsa Bechamel: Derretir la mantequilla en una olla, agregar la harina y revolver por 1-2 minutos. Añadir la leche gradualmente batiendo constantemente. Sazonar con sal, pimienta y nuez moscada hasta espesar.',
    'En un molde refractario de 30x23x7 cm, armar la lasaña extendiendo una capa delgada de salsa bechamel y ragú en el fondo.',
    'Colocar una capa de láminas de lasaña, luego cubrir con salsa de carne, salsa bechamel, queso mozzarella y un toque de parmesano. Repetir las capas hasta llenar el molde.',
    'Terminar con una capa de bechamel, abundante queso mozzarella y queso parmesano encima.',
    'Hornear a 180°C durante 25-30 minutos hasta que el queso esté derretido, burbujeante y dorado en la parte superior. Dejar reposar 10 minutos antes de cortar 6 porciones.',
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
      
      {/* Top Large Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/lasagna.jpg')}
          style={styles.imagen}
        />
      </View>

      {/* Floating Recipe Content Card */}
      <View style={styles.infoCard}>
        <Text style={styles.titulo}>LASAGNA</Text>
        
        {/* Underline decorative bar */}
        <View style={styles.titleBar} />

        {/* Quick Info Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badgeItem}>
            <Ionicons name="time" size={18} color={COLORS.primary} />
            <Text style={styles.badgeTitle}>Prep.</Text>
            <Text style={styles.badgeVal}>80 min</Text>
          </View>
          <View style={styles.badgeItem}>
            <Ionicons name="flame" size={18} color={COLORS.secondary} />
            <Text style={styles.badgeTitle}>Dificultad</Text>
            <Text style={styles.badgeVal}>Medio</Text>
          </View>
          <View style={styles.badgeItem}>
            <Ionicons name="people" size={18} color={COLORS.success} />
            <Text style={styles.badgeTitle}>Porciones</Text>
            <Text style={styles.badgeVal}>6 pers.</Text>
          </View>
        </View>

        {/* Ingredients Section */}
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

        {/* Preparation Section */}
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
      
      {/* Extra space at bottom */}
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