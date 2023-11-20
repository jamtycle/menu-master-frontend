import React from "react";
import { Text, TextInput, StyleSheet, ImageBackground, Button, Alert, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const data = [
  { key: '1', value: 'Duck' },
  { key: '2', value: 'Chicken' },
  { key: '3', value: 'Beef' },
];


export default function PrepList(props) {
  const [prepList, setPrepList] = React.useState(["Duck", "Beef"]);
  const [finishedList, setFinishedList] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const onItemAdd = () => {
    if (!selectedItem) return;

    Alert.alert(selectedItem);

    let pl = prepList;
    if (!pl) pl = [];
    setPrepList([...pl, selectedItem]);
  };

  const onItemFinished = (_value, _index, _amt) => {
    const name = prepList[_index];

    setFinishedList([...finishedList, { name: name, amount: _amt}]);

    const list = prepList;
    list.splice(_index, 1);
    setPrepList(list);
  };

  const renderList = () => {
    return (
      <View>
        {prepList.map((x, i) => {
          const val = (Math.random() * 100).toFixed(2);
          return (
            <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: 10 }}>
              <View style={{ justifyContent: "center", width: "40%" }}>
                <BouncyCheckbox onPress={(isChecked: boolean) => onItemFinished(isChecked, i, val)} text={x} textStyle={{ color: "black", fontSize: 18 }} />
              </View>
              <View style={{ justifyContent: "center", width: "40%" }}>
                <Text style={styles.subTitle}>{val}</Text>
              </View><View style={{ justifyContent: "center", width: "20%" }}>
                <Button title="Go to"></Button>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderFinishedList = () => {
    return (
      <View>
        {finishedList.map((x) => {
          return (
            <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: 10 }}>
              <View style={{ justifyContent: "center", width: "40%" }}>
                <Text style={styles.subTitle}>{x.name}</Text>
              </View>
              <View style={{ justifyContent: "center", width: "40%" }}>
                <Text style={styles.subTitle}>{x.amount}</Text>
              </View><View style={{ justifyContent: "center", width: "20%" }}>
                <Button title="Go to"></Button>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <>
      <Text style={styles.text}>Perp List</Text>
      <View style={styles.addNewItem}>
        <View style={{ justifyContent: "center", width: "30%" }}>
          <Button title="Add Item" onPress={onItemAdd} style={{ flex: 1 }} />
        </View>
        <View style={{ justifyContent: "center", width: "70%" }}>
          <SelectList setSelected={(val) => setSelectedItem(val)} data={data} save="value" style={{ flex: 2 }} />
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: 10 }}>
        <View style={{ justifyContent: "center", width: "40%" }}>
          <Text style={styles.subTitle}>Name</Text>
        </View>
        <View style={{ justifyContent: "center", width: "40%" }}>
          <Text style={styles.subTitle}>Amount</Text>
        </View><View style={{ justifyContent: "center", width: "20%" }}>
          <Text style={styles.subTitle}>Recipe</Text>
        </View>
      </View>

      {renderList()}

      <Text style={styles.subTitle}>Finished</Text>
      {renderFinishedList()}

    </>
  );
}

const styles = StyleSheet.create({
  addNewItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
});

// <Text style={styles.text}>Menu Master</Text>
//       <Text style={styles.subTitle}>Welcome back</Text>

//       <TextInput id="username" style={styles.input} onChangeText={onChangeUsername} value={username} placeholder={"Username"} />
//       <TextInput id="password" secureTextEntry={true} style={styles.input} onChangeText={onChangePassword} value={password} placeholder={"Password"} />