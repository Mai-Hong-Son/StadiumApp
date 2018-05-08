import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ContentRow from './ContentRow';
import LoadingPlaceholder from './../Reusables/Loadings/LoadingPlaceholder';
import _ from 'lodash';
import ModalDropdown from 'react-native-modal-dropdown';

export default class StadiumView extends Component {

  constructor(props){
    super(props);

    this.state = {
      page: 1,
      perPage: 20,
      loadingFooter: false,
      stadiumsData: [],
      districtName: [],
      isSetData: false,
      isloadData: false,
      isloadStadiumByDisttrict: false,
      isSearch:false
    }

  }

  componentDidMount(){
    this.props.getAllDistrict();
    this.props.getAllStadium(this.state.page, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    const { page, districtName, isSetData, isloadData, isloadStadiumByDisttrict, isSearch } = this.state
    const { data, status } = nextProps.districts
    
    if( status === true && isSetData === false && !isSearch) {
      districtName.push("Tất cả");
      data.forEach(element => {
        districtName.push(element.name)
      });
      this.setState({
        isSetData: true,
        stadiumsData: nextProps.stadiums.data
      })
    }

    if( nextProps.stadiums.status === true && isloadData === false && !isSearch) {
      this.setState({
        stadiumsData: nextProps.stadiums.data,
        isloadData: true
      })
    }

    if(isloadStadiumByDisttrict && !isSearch){
      this.setState({
        stadiumsData: nextProps.stadiumsByDistrict.data,
      })
    }

    if(page === 1){
      this.setState({
        loadingFooter: false,
      })
    } else {
      this.setState({
        loadingFooter: true,
      })
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('StadiumDetail', { stadiumId: item._id, title: item.name }) }>
      <ContentRow item={item}/>
    </TouchableOpacity>
  );

  onRefresh = () => {
    this.props.getAllStadium(1, this.state.perPage);
    this.setState({
      page: 1,
      isloadData: false,
      isloadStadiumByDisttrict: false,
      isSetData: false,
      loadingFooter: false,
      isSearch: false
    });
  }

  onEndReached = () => {
    if(this.state.isloadStadiumByDisttrict === true) {
      this.props.listStadiumByDistrict(this.state.page + 1, this.state.perPage, this.state.idDistrict);
    } else {
      this.props.getAllStadium(this.state.page + 1, this.state.perPage);
    }
    this.setState({
      page: this.state.page + 1,
      isloadData: false
    });
  }

  onSelectDropdown = (index, value) => {
    if(value === "Tất cả") {
      this.onRefresh();
    } else {
      const idDistrict = _.find(this.props.districts.data, (item) => {
        return item.name === value;
      })._id;

      this.props.listStadiumByDistrict(1, this.state.perPage, idDistrict);
      this.setState({
        page: 1,
        isloadStadiumByDisttrict: true,
        idDistrict: idDistrict
      });
    }
  }

  onChangeText = (textChange) => {
    if(textChange != ""){
      this.setState({
        loadingFooter: false,
        isSearch: true,
        stadiumsData: _.filter(this.state.stadiumsData, item => _.includes(item.name,textChange)),
      })
    } else {
      this.onRefresh()
    }
  }

  render() {
    const { loadingFooter } = this.state
    const { stadiumsData } = this.state

    const header = (<View style= {styles.containerHeader}>
      <View style= {styles.stylefilter}>
        <TextInput
        style={styles.containerFilter}
        underlineColorAndroid='transparent'
        placeholder='Search for stadiums'
        placeholderTextColor='#6e6e6e'
        onChangeText={this.onChangeText}/>

        <ModalDropdown
        style={styles.menuDropdown}
        dropdownStyle={{
          width: 129,
          borderRadius: 4,
        }}
        dropdownTextHighlightStyle={{
          color: '#32CD32'
        }}
        textStyle={{
          textAlign: 'center',
          color: '#FF1493'
        }}
        options={this.state.districtName}
        defaultValue={'Chọn khu vực...'}
        onSelect={this.onSelectDropdown}
        />
      </View>
    </View>);

    if (_.isEmpty(stadiumsData)) return (
      <View style={styles.container}>
        {/* <Header districts = {this.props.districts}/> */}
        {header}
      </View>
    );

    return (
      <View style={styles.container}>
        {/* <Header districts = {this.props.districts}/> */}
        {header}
        <View style={styles.content}>
          <FlatList
            ListFooterComponent={() => <LoadingPlaceholder visible={loadingFooter} />}
            data={stadiumsData}
            keyExtractor={({ _id }) => _id}
            onRefresh={this.onRefresh}
            refreshing={false}
            renderItem={this.renderItem}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
    backgroundColor: "#32CD32"
  },
  containerHeader: {
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    height: 130,
},
stylefilter: {
    flex: 1,
    justifyContent: 'center',
},
Buttonfilter: {
    flex: 1,
},
iconFilter: {
    flex:1,
    marginLeft: 10,
},
containerFilter: {
    flexDirection: 'row',
    width: 343,
    height: 44,
    borderRadius:4,
    borderWidth: 1,
    backgroundColor: '#E0FFFF',
    borderColor: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 30,
    paddingTop: 8,
    paddingLeft: 10,
    opacity: 0.7
},
textFilter: {
    flex:8,
    alignItems: 'flex-start',
    fontSize: 13,
    color: 'black',
    // marginLeft: 5,
    marginTop: 5,
},
menuDropdown: {
  height: 30,
  width: 130,
  backgroundColor: '#E0FFFF',
  opacity: 0.7,
  alignSelf: 'flex-start',
  marginLeft: 16,
  borderRadius: 4,
  justifyContent: 'center',
  borderColor: 'gray',
  borderWidth: 1,
}
});
