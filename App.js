/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native'
import JFlatList from './JFlatList'

var _this = null;
export default class App extends Component {
    index = 0;

    constructor(props) {
        super(props);
        _this = this;
        this.state={
            data:[1,2,3,4,5,6,7,8,9]
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
            <JFlatList ref={JFlatList => this.JFlatList = JFlatList}
                       data={this.state.data}
                       renderItem={
                           ({item, index}) => {
                               return (
                                   <Text style={{height:80}}>{item}</Text>
                               )
                           }
                       }
                       onRefresh={()=>{
                           console.log('refresh callback');
                           setTimeout(function () {
                              _this.JFlatList.refreshFinish();
                           },3000)
                       }}
                       onLoadMore={()=>{
                           console.log('loadMore callback');
                           setTimeout(function () {
                               _this.setState({
                                   data:[..._this.state.data,1,2,3,4,5,6,7,8,9]
                               });
                               _this.JFlatList.loadMoreFinish();

                           },3000)
                       }}
            />
            </View>
        );
    }
}

