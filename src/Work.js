import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    flex: 1
  },
  button: {
    marginBottom: 30,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  buttonText: {
    padding: 20,
    color: "white",
    alignItems: "center"
  },
  counterRow: {
    padding: 10,
    color: "white",
    flexDirection: "row",
    flex: 1
  },
  counterLeftView: {
    alignItems: "center",
    margin: 8,
    color: "white",
    flex: 0.4
  },
  counterRightView: {
    alignItems: "center",
    margin: 8,
    color: "white",
    flex: 0.6
  },
  textBox: {
    alignItems: "center",
    alignSelf: "stretch",
    margin: 8,
    backgroundColor: "#2196F3",
    height: 100
  }
});

let timer;

export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      value: "",
      currentNumber: "",
      index: 0
    };
  }

  componentDidMount() {
    console.info("componentDidMount");
    this.setNumber();
  }

  onPressButton = () => {
    // var c = this.state.count;
  };

  setNumber = () => {
    let number = 1;
    const countsArray = [];
    // console.info("countsArray");
    for (let index = 0; index < 100; index++) {
      // console.info(number);
      countsArray[index] = number++;
    }

    this.setState({
      count: countsArray
    });
  };

  printValue = number => {
    if (this.isThree(number) && this.isFive(number)) {
      this.setState({
        value: "AB"
      });
    } else if (this.isThree(number)) {
      this.setState({
        value: "A"
      });
    } else if (this.isFive(number)) {
      this.setState({
        value: "B"
      });
    } else {
      this.setState({
        value: "not A or B"
      });
    }
  };

  isThree = number => {
    if (number % 3 === 0) {
      return true;
    }
    return false;
  };

  isFive = number => {
    if (number % 5 === 0) {
      return true;
    }
    return false;
  };

  onStartCount = () => {
    timer = setInterval(this.timer, 1000);
  };

  onStopTimer = () => {
    clearInterval(timer);
  };

  timer = () => {
    const c = this.state.count;
    const i = this.state.index;
    this.printValue(c[i]);
    console.info(c[i]);
    this.setState({
      currentNumber: c[i]
    });

    if (i < 100) {
      this.setState({ index: this.state.index + 1 });
      console.info("index = ", this.state.index);
    } else {
      console.info("i > = 100");
      console.info("index = ", this.state.index);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.counterView}
          onPress={this.onStartCount}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>START</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.counterView} onPress={this.onStopTimer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>STOP</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.counterLeftView}
            onPress={this.onPressButton}
          >
            <View style={styles.textBox}>
              <Text style={styles.buttonText}>{this.state.currentNumber}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.counterRightView}>
            <View style={styles.textBox}>
              <Text style={styles.buttonText}>{this.state.value}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
