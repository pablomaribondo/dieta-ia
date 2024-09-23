import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Share,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

import { useDataStore } from "@/store/data";
import { api } from "@/services/api";
import { colors } from "@/constants/colors";
import type { Data } from "@/types/data";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Failed load nutrition");
        }

        const response = await api.post<ResponseData>("/create-nutrition", {
          name: user.name,
          weight: user.weight,
          height: user.height,
          age: user.age,
          gender: user.gender,
          objective: user.objective,
          level: user.level,
        });

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleShare = async () => {
    try {
      if (data && Object.keys(data).length === 0) return;

      const supplements = `${data?.supplements.map((item) => ` ${item}`)}`;

      const dietPlan = `${data?.diet_plan.map(
        (item) =>
          `\n- Nome: ${item.name}\n- Horário: ${
            item.time
          }\n- Alimentos: ${item.meals.map((meal) => ` ${meal}`)}`
      )}`;

      const message = `Dieta: ${data?.name} - Objetivo: ${data?.objective}\n\n${dietPlan}\n\n- Dicas de Suplemento: ${supplements}`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>

          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
            <Feather name="share-2" size={14} color={colors.white} />
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.name}</Text>
            <Text style={styles.objective}>Foco: {data.objective}</Text>

            <Text style={styles.label}>Refeições:</Text>

            <ScrollView>
              <View style={styles.diet_plan}>
                {data.diet_plan.map((diet) => (
                  <View key={diet.name} style={styles.diet}>
                    <View style={styles.dietHeader}>
                      <Text style={styles.dietName}>{diet.name}</Text>
                      <Ionicons
                        name="restaurant"
                        size={16}
                        color={colors.black}
                      />
                    </View>

                    <View style={styles.dietContent}>
                      <Feather name="clock" size={14} color={colors.black} />
                      <Text>Horário: {diet.time}</Text>
                    </View>

                    <Text style={styles.mealsText}>Alimentos:</Text>
                    {diet.meals.map((meal) => (
                      <Text key={meal}>{meal}</Text>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.supplements}>
                <Text style={styles.dietName}>Dicas de suplementos:</Text>
                {data.supplements.map((supplement) => (
                  <Text key={supplement}>{supplement}</Text>
                ))}
              </View>

              <Pressable
                style={styles.button}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.buttonText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    color: colors.background,
    fontWeight: "bold",
  },
  buttonShare: {
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
    flexDirection: "row",
    gap: 4,
  },
  buttonShareText: {
    color: colors.white,
    fontWeight: "500",
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  objective: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  diet_plan: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  diet: {
    backgroundColor: "rgba(208, 208, 208, 0.1)",
    padding: 8,
    borderRadius: 4,
  },
  dietHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  dietName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dietContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mealsText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  supplements: {
    backgroundColor: colors.white,
    marginVertical: 14,
    padding: 14,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.blue,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
