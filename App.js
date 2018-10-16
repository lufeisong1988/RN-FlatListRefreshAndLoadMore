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
import JSectionList from './JSectionList'
import JScrollView from './JScrollView'

var _this = null;
export default class App extends Component {
    index = 0;

    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            data: [
                {title: 'a', data: [1, 2, 3]},
                {title: 'b', data: [1, 2, 3]},
                {title: 'c', data: [1, 2, 3]},
                {title: 'd', data: [1, 2, 3]},
            ]
        }
    }

    render() {
        return (
            <JScrollView
                ref={JScrollView => this.JScrollView = JScrollView}
                onRefresh={()=>{
                    setTimeout(function () {
                        _this.JScrollView.refreshFinish();
                    },3000)
                }}
                childView={
                    <View style={{width:300,height:300,backgroundColor:'red'}}/>
                }
            />
            /**
            <View style={{flex: 1}}>
                <JSectionList ref={JSectionList => this.JSectionList = JSectionList}
                              styles={{marginTop:100}}
                              sections={this.state.data}
                              renderItem={
                                  ({item, index, section}) => {
                                      return (
                                          <Text style={{height: 80}}>{section.title + item}</Text>
                                      )
                                  }
                              }
                              renderSectionHeader={
                                  (info) => {
                                      console.log('renderSectionHeader ' + info);
                                      return (
                                          <Text style={{height: 80}}>i am section</Text>
                                      )
                                  }
                              }

                              stickySectionHeadersEnabled={true}
                              onRefresh={() => {
                                  console.log('refresh callback');
                                  setTimeout(function () {
                                      _this.JSectionList.refreshFinish();
                                      _this.setState({
                                          data:[{title: 'a', data: [1, 2, 3]},
                                              {title: 'b', data: [1, 2, 3]},
                                              {title: 'c', data: [1, 2, 3]},
                                              {title: 'd', data: [1, 2, 3]},]
                                      })
                                  }, 3000)
                              }}
                              onLoadMore={() => {
                                  console.log('loadMore callback');
                                  setTimeout(function () {
                                      _this.JSectionList.loadMoreFinish();
                                      _this.setState({
                                          data:[..._this.state.data,{title: 'a', data: [1, 2, 3]},
                                              {title: 'b', data: [1, 2, 3]},
                                              {title: 'c', data: [1, 2, 3]},
                                              {title: 'd', data: [1, 2, 3]},]
                                      })
                                  }, 3000)
                              }}
                              onViewableItemsChanged={(info) => {
                                  console.log('onViewableItemsChanged ' + info)
                              }}
                />
            </View>
             */
        );
    }
}

