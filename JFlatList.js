/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl, Dimensions, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window')
type Props = {};
var _this = null;
const stateInit = -1;//初始化，防止触发onEndReached
const stateIdle = 0;
const stateLoading = 1;
const stateLodaMore = 2;
export default class JFlatList extends Component<Props> {
    index = 0;

    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            statue: stateInit,//-1:init,0:idle,1:loading,2:loadMore
            noMoreData: false,
        };
    }

    static propTyps = {
        onRefresh: PropTypes.func.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        data: PropTypes.array,
        renderItem: PropTypes.node,
    };
    _onRefresh = () => {
        console.log('refresh status : ' + this.state.statue);
        if (this.state.statue != stateIdle) {
            console.log('refresh not idle');
            return
        }
        this.setState({statue: stateLoading});
        this.props.onRefresh && this.props.onRefresh();
    };
    _onLoadMore = (info) => {
        console.log('loadMore status : ' + this.state.statue);
        //初始化的时候，列表为空，防止触发onEndReached，拦截。重置状态为idle
        if(this.state.statue === stateInit){
            this.setState({statue: stateIdle});
            return
        }
        if (this.state.statue != stateIdle || this.state.noMoreData) {
            console.log('loadMore ' + this.state.statue != stateIdle ? ' not idle ' : ' idle ' + '; noMoreData ' + this.state.noMoreData);
            return
        }
        this.setState({statue: stateLodaMore});
        this.props.onLoadMore && this.props.onLoadMore();
    };
    _renderFooter = () => {
        return (
            this.state.noMoreData ? <Text>No more data</Text> : <Text>loadMore data</Text>
        )
    };

    refreshFinish() {
        console.log('refresh finish ');
        this.setState({
            statue: stateIdle
        })
    }

    loadMoreFinish(noMoreData = false) {
        console.log('loadMore finish ');
        this.setState({
            statue: stateIdle
        });
        this.setNoMoreData(noMoreData)
    }

    setNoMoreData(noMoreData = false) {
        console.log('setNoMoreData ' + noMoreData);
        this.setState({
            noMoreData: noMoreData
        })
    }

    render() {
        return (
            <FlatList
                style={{backgroundColor: 'blue'}}
                data={this.props.data}
                renderItem={this.props.renderItem}
                ListFooterComponent={this._renderFooter}
                onEndReached={(info) => {
                    this._onLoadMore(info)
                }}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'red', width: width}}
                        refreshing={this.state.statue === stateLoading ? true : false}
                        onRefresh={this._onRefresh}
                        title="Loading..."
                        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({});
