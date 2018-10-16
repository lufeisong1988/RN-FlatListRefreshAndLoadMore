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
const stateIdle = 0;
const stateLoading = 1;
export default class JScrollView extends Component<Props> {
    index = 0;

    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            statue: stateIdle,//0:idle,1:loading
        };
    }

    static propTyps = {
        styles:PropTypes.object,
        onRefresh: PropTypes.func.isRequired,
        childView:PropTypes.node
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

    refreshFinish() {
        console.log('refresh finish ');
        this.setState({
            statue: stateIdle
        })
    }

    render() {
        return (
            <ScrollView
                style={[{backgroundColor: 'transparent'},this.props.styles]}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'transparent', width: width}}
                        refreshing={this.state.statue === stateLoading ? true : false}
                        onRefresh={this._onRefresh}
                        title="Loading..."
                        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                    />
                }
            >
                {this.props.childView ? this.props.childView : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({});
