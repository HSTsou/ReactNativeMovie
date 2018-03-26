import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginBottom: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    padding: 10,
    color: 'white',
    alignItems: 'center',
  },
  counterRow: {
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },
  counterLeftView: {
    flex: 0.4,
  },
  counterRightView: {
    flex: 0.6,
  },
  textBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 8,
    backgroundColor: '#2196F3',
    height: 100,
  },
});

const resultStr = {
  three: 'A',
  five: 'B',
  threeAndFive: 'AB',
  notThreeOrFive: 'not A or B',
};

let timer;
let index = 0;

export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberArray: [],
      result: '',
      currentNumber: '',
    };
  }

  componentDidMount() {
    this.initNumbers();
  }

  onStartCount = () => {
    timer = setInterval(this.timer, 1000);
  };

  onStopTimer = () => {
    clearInterval(timer);
  };

  initNumbers = () => {
    let number = 1;
    const countsArray = [];
    for (let i = 0; i < 100; i++) {
      countsArray[i] = number++;
    }

    this.setState({
      numberArray: countsArray,
    });
  };

  printValue = (number) => {
    if (this.isThree(number) && this.isFive(number)) {
      this.setState({
        result: resultStr.threeAndFive,
      });
    } else if (this.isThree(number)) {
      this.setState({
        result: resultStr.three,
      });
    } else if (this.isFive(number)) {
      this.setState({
        result: resultStr.five,
      });
    } else {
      this.setState({
        result: resultStr.notThreeOrFive,
      });
    }
  };

  isThree = (number) => {
    if (number % 3 === 0) {
      return true;
    }
    return false;
  };

  isFive = (number) => {
    if (number % 5 === 0) {
      return true;
    }
    return false;
  };

  timer = () => {
    const numberArray = this.state.numberArray;
    this.printValue(numberArray[index]);
    console.info(numberArray[index]);
    this.setState({
      currentNumber: numberArray[index],
    });

    if (index < 100) {
      index++;
      console.info('index = ', index);
    } else {
      console.info('i > = 100');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.counterView} onPress={this.onStartCount}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>START</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.counterView} onPress={this.onStopTimer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>PAUSE</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.counterRow}>
          <View style={styles.counterLeftView}>
            <View style={styles.textBox}>
              <Text style={styles.buttonText}>{this.state.currentNumber}</Text>
            </View>
          </View>

          <View style={styles.counterRightView}>
            <View style={styles.textBox}>
              <Text style={styles.buttonText}>{this.state.result}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
