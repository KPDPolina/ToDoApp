import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import tempData from './tempData';
import ToDoList from './components/ToDoList';
import AddListModal from './components/addListModal';

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData
  }

  toglleTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }

  renderList = list => {
    return <ToDoList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: []}]})
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toglleTodoModal()}>
          <AddListModal closeModal={() => this.toglleTodoModal()} addList={this.addList}/>
        </Modal>


        <StatusBar backgroundColor={colors.blue} barStyle='light-content' />

        <View style={styles.title}>
          <Text style={styles.titleText}>ToDo App</Text>
        </View>

        <View style={styles.addList}>
          <TouchableOpacity style={styles.plus} onPress={() => this.toglleTodoModal()}>
            <AntDesign name="plus" size={40} color={colors.blue} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingBottom: 5 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (this.renderList(item))}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.wight,
  },
  title: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: colors.blue,
    justifyContent: "center"
  },
  titleText: {
    color: colors.wight,
    fontSize: 25,
    fontStyle: "italic",
  },
  addList: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  plus: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.light_blue,
    borderStyle: "dotted"
  }

});
