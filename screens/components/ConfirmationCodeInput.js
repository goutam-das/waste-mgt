import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

//import styles from './styles';

const CELL_COUNT = 6;

export default function BasicExample(props) {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const setOTp = (v) => {
    props.setOTP(v);
    setValue(v);
  }
  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...propss}
        value={value}
        onChangeText={setOTp}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"

        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { padding: 20 },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ABB3BF",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
