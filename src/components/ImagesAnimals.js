//@flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import images from '../data/images';

export default class ImagesAnimals extends Component {
  state = {
    index: 0,
    imageWidth: null
  };

  nextImage = (event) => {
    let { index, imageWidth } = this.state,
      X = event.nativeEvent.locationX,
      delta = (X < imageWidth / 2) ? -1 : +1,
      newIndex = (index + delta) % images.length;

    if (newIndex < 0) newIndex = images.length - Math.abs(newIndex);

    this.setState({
      index: newIndex
    });
  };

  onImageLayout = (event) => {
    this.setState({
      imageWidth: event.nativeEvent.layout.width
    });
  };

  render() {
    const image = images[this.state.index];

    return (
      <View style={styles.container}>
        <View style={styles.empty} />
        <TouchableHighlight onPress={this.nextImage.bind(this)} style={styles.image}>
          <Image source={{uri: image.uri}} style={styles.image} onLayout={this.onImageLayout.bind(this)}>
            <Text style={styles.imageLabel}>{image.label}</Text>
          </Image>
        </TouchableHighlight>
        <View style={styles.empty} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(235, 123, 45, 1)',
  },
  image: {
    flex: 2,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageLabel: {
    textAlign: 'center',
    backgroundColor: 'rgba(76, 178, 212, 1)',
    color: '#FFF',
    width: 320
  },
  empty: {
    flex: 1
  }
});
