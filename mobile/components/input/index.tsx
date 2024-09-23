import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from "react-native";
import { Controller } from "react-hook-form";

import { colors } from "@/constants/colors";

interface InputProps {
  control: any;
  error?: string;
  keyboardType: KeyboardTypeOptions;
  name: string;
  placeholder?: string;
  rules?: object;
}

export function Input({
  control,
  error,
  keyboardType,
  name,
  placeholder,
  rules,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            style={styles.input}
            value={value}
          />
        )}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 44,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
