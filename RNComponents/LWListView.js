/**
 * Created by mac on 17/3/20.
 */
import React, {Component} from 'react';
import {AppRegistry,Text,Image,View,StyleSheet, TextInput, ScrollView,TouchableHighlight, ListView,PropTypes,Navigator, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';


let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREENT_HEIGHT = Dimensions.get('window').height;
const moreText = "加载完毕";
var pageNum = 1;
const pageSize = 15;
var totalList = new Array();

String.prototype.trim = function () {
    return this.replace(/^[\s,，]+/,"").replace(/^[\s,，]+/,"");
}

export default class LWListView extends Component {

    constructor(props){
        super(props);
        this.page = 1
        this._cellClick = this._cellClick.bind(this)
        this.state = {
            text : "",
            loadMore :false,
            userData : {},
            loaded:false,
            foot:0,
            data:[],
            isLoadingMore:false,
            ds :new ListView.DataSource(
                {
                    rowHasChanged: (r1,r2) => r1 !==r2,
                }
            )
        }
    }


    componentDidMount() {
        console.log('did Mount')
        this._fetchData(1,null)
    }
    async _fetchData(page,refesh){
        let url = 'http://dili.bdatu.com/jiekou/main/p'+this.page +'.html'
        let response = await fetch(url)
        let json  = await response.json()
        if(json){
            console.log(url)
            if (page == 1 && refesh) {
                this.setState({
                    data:json.album,
                    isLoadingMore:false,
                })
                this.page = 1
            }else{
                var tempData = this.state.data
                tempData.pop()
                tempData = tempData.concat(json.album)
                this.setState({
                    data:tempData,
                    isLoadingMore:false,
                })
                this.page ++;
            }
        }
    }
    _cellClick(rowData,rowID){
        // next = {
        //     component:TwoPage,
        //     title: 'Two',
        //     passProps:{myProp:'bar'}
        // };
        // console.log(rowData)
        // this.props.navigator.push(next)
    }

    _renderRow(rowData,sectionId,rowId){
        if(this.state){
            if (rowId == this.state.data.length - 1) {
                return(
                    <View style={{alignItems:'center',margin:10}}><Text style={{textAlign:'center',color :'#999999'}}>正在加载...</Text></View>
                )
            }
            return(

                <TouchableHighlight onPress={() =>{ this._cellClick(rowData,rowId);}}>
                    <View>
                        <View style = {{backgroundColor:'#FFFFFF',margin:10,borderWidth:0.5,borderColor:"rgba(0,0,0,0.1)"}}>
                            <Image style={{alignItems:'center',justifyContent:"center",height:SCREEN_WIDTH * 0.6,margin:6}} source={{uri:rowData.url}} />
                        </View>
                        <View style={{margin:10}}>
                            <Text style={{position:'absolute',marginTop:-10,alignSelf:'center',fontSize:15,backgroundColor:"white",textAlign:"center",color:"#333333"}}>{rowData.title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>

            );
        }
    }
    _onRefresh(refresh) {
        this._fetchData(1, refresh);
    }
    _onEndReached(event) {
        console.log('will load')
        if (! this.state.isLoadingMore) {
            this._fetchData();
            console.log('did load')

            this.state.isLoadingMore = true
        }
    }
    render() {
        if (this.state.data){
            return (
                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.ds.cloneWithRows(this.state.data)}
                        renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this._onRefresh(PullRefresh)} {...props}     />}
                        renderRow={(rowData,sectionId,rowID) => this._renderRow(rowData,sectionId,rowID)}
                        onEndReached={(event)=>{ this._onEndReached(event); }}
                        enableEmptySections = {true}
                    />
                </View>



            )

        }
        return (
            <View><Text style={{fontSize:14,alignItems:'center',color:'#555555',textAlign:'center',paddingTop:30}}>正在加载...</Text></View>
        )
    }
    startActivity() {
        const {nav} = this.props;
        if (nav) {
            nav.push({
                name: 'TwoPage',
                component: TwoPage,
                params: {
                    msg: "我从第一页过来的"
                }
            })
        }

    }
}
styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
AppRegistry.registerComponent('RNTest', () => LWListView);
