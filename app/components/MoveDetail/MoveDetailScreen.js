import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Modal
} from 'react-native';
import { Icon, Divider, List, ListItem, Button } from 'react-native-elements';
import { moveDetailsAction } from '../../actions';
import styles from "./styles";
import FloatingLabelInput from "./FloatingLabelInput";
import FloatingLabelText from "./FloatingLabelText";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const window = Dimensions.get('window');

const list = [
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
      {
        from: 'Customer',
        message: 'Contact Stage Book - Contact Stage Book'
      },
      {
        from: 'Operator',
        message: 'Contact Stage Lead - Contact Stage Lead'
      },
    ]

class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    const { params = {} } = navigation.state; //To fix error contract_name is undefined
    return {
      title: params.contract_name,
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
        fontWeight: '700',
        alignSelf: 'center'
      },
      headerStyle: {
        backgroundColor: '#264b7f',
        shadowOpacity: 0,
      },
      headerLeft: 
        <Icon
          name='menu'
          type='entypo'
          size={25}
          color='#fff'
          iconStyle={{ padding: 10}}
          onPress={() => navigate('DrawerOpen')} />, 
      headerRight: 
        <Icon
          name='times'
          type='font-awesome'
          size={22}
          color='#fff'
          iconStyle={{ padding: 10}}
          onPress={() => navigate('MyMoves')} />, 
    }
  };

  constructor() {
    super();
    this.state = {
      contract_name: null,
      message: null,
      icon_up: {},
      slideAnimation: {},
      dimensions: [],
      modalVisible: false,
      startTimePickerVisible: false,
      stopTimePickerVisible: false,
      flatrate: ''
    }
  }

  componentWillMount() {
    const { params = {} } = this.props.navigation.state;
    if(params.id)
    {
      this.setState({ contract_name: params.contract_name});
      this.props.navigation.dispatch(moveDetailsAction(params.id));
    }
  }

  onPressGo = () => {
    const {navigate} = this.props.navigation;
  }

  getArrowIcon = (name, icon) => {
    var icon_type = this.state.icon_up[name]? 'chevron-up':'chevron-down';
    var icon_color = '';
    switch (icon) {
      case "text_success":
        icon_color = '#49bf67';
        break;
      case "text_danger":
        icon_color = '#f34541';
        break;
      case "text_warning":
        icon_color = '#f8a326';
        break;
      default:
        icon_color = '#234885';
        break;
    }
    return (
      <Icon
        name={icon_type}
        type='font-awesome'
        color={icon_color}
        size={18}
        onPress={() => this.onPressArrow(name)}
      />
    )
  }

  onPressArrow = (name) => {
    console.log(name);
    if(name in this.state.slideAnimation == false)
    {
      var slide = this.state.slideAnimation;
      slide[name] = new Animated.Value(0);
      this.setState(slide)
    }
    var to_value = this.state.icon_up[name]? 0: this.state.dimensions[name].height;
    console.log(to_value)
    var icon_up = this.state.icon_up;
    icon_up[name] = !icon_up[name];
    this.setState({icon_up});

    Animated.timing(
      this.state.slideAnimation[name],
      {toValue: to_value, duration: 300}
    ).start();

    
  }

  onLayout = param => event => {
    if (this.state.dimensions[param]) return // layout was already called
    let {width, height} = event.nativeEvent.layout;
    var dimensions = this.state.dimensions;
    dimensions[param] = {width, height};
    this.setState({dimensions});
    this.refs[param].setNativeProps({
      height: 0,
      opacity: 1,
      position: 'relative'
    });
  }

  displayText = (text) => {
    console.log(text)
    if(text)
      return <Text style={styles.slideText}>{text}</Text>
    else
      return null;
  }

  displayAlert = (text, importance) => {
    var color = null;
    if(text)
      {
        if(importance == 'text_success')
          color = '#49bf67';
        else if(importance == 'text_danger')
          color = '#f34541';
        else if(importance == 'text_warning')
          color = '#f8a326';
        else
          color = '#234885';
        return <Text  style={[styles.slideText, {color: color }]}>{text}</Text>
      }
    else
      return null;
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  _handleDatePicked = param => date => {
    var myDate = new Date(date);
    var time = myDate.getHours()+':'+myDate.getMinutes();
    this.setState({ [param+'TimePickerVisible']: false });
    this.setState({ [param]: time });
    
  };

  getHours = () => {
    var startTime=moment(this.state.start, "HH:mm");
    var endTime=moment(this.state.stop, "HH:mm");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asHours());
    hours = hours? hours: '0';
    return hours;
  }

  getPackingTotal = () => {
    var boxes = this.state.boxes? this.state.boxes: 0;
    var paper = this.state.paper? this.state.paper: 0;
    var tape = this.state.tape? this.state.tape: 0;
    var wrap = this.state.wrap? this.state.wrap: 0;
    var bags = this.state.bags? this.state.bags: 0;
    var boxrent = this.state.boxrent? this.state.boxrent: 0;
    var other = this.state.other? this.state.other: 0;
    var total = boxes + paper + tape + wrap + bags + boxrent + other;
    return total;
  }

  render() {
    console.log(this.state)
    const {navigate} = this.props.navigation;
    const { data } = this.props.move;
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.rows}>
              
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('who')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='user'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  WHO</Text>
                  </View>
                  <Text style={styles.value}> {data.who? data.who.name+' '+data.who.cell_phone: '--'}</Text>
                  { data.who && this.getArrowIcon('who', data.who.move_type_alert_importance)}
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'who'} onLayout={this.onLayout('who')} style={[styles.slideView, {height: this.state.slideAnimation['who']}]}>
                  { data.what &&
                      <View style={styles.slideBox}>
                        {this.displayText(data.who.title+' '+data.who.name)}
                        {this.displayText(data.who.home_phone)}
                        {this.displayText(data.who.cell_phone)}
                        {this.displayText(data.who.work_phone)}  
                        {this.displayText(data.who.email)} 
                        {this.displayAlert(data.who.move_type_alert, data.who.move_type_alert_importance)} 
                  </View>
                    }             
                </Animated.View>
              </View>
              
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('what')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='suitcase'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}> WHAT</Text>
                    </View>
                    <Text style={styles.value}> {data.what? data.what.cargo_type+' '+(data.what.cargo_room? data.what.cargo_room+'Rooms ':'')+data.what.cargo_weight+' '+data.what.cargo_cubic : '--'}</Text>
                    { data.what && this.getArrowIcon('what', data.what.cargo_alert_importance)}
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'what'} onLayout={this.onLayout('what')} style={[styles.slideView, {height: this.state.slideAnimation['what']}]}>
                    { data.what &&
                      <View style={styles.slideBox}>
                      {this.displayText(data.what.cargo_type)}
                      {this.displayText((data.what.cargo_room? data.what.cargo_room+'Rooms ':''))}
                      {this.displayText(data.what.cargo_weight)}
                      {this.displayText(data.what.cargo_cubic)}
                      {this.displayText(data.what.cargo_detail)}
                      {this.displayText(data.what.cargo_note)}
                      {this.displayAlert(data.what.cargo_alert_id, data.what.cargo_alert_importance)}
                      </View>
                    }
                </Animated.View>
              </View>
              
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('where')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='location-arrow'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  WHERE</Text>
                  </View>
                  
                  <Text style={styles.value}> {data.where? data.where.location_to.no + data.where.location_to.street+' '+data.where.location_to.apartment+' '+data.where.location_to.entry_number+' '+data.where.location_to.building: '--'}</Text>
                  { data.where && this.getArrowIcon('where', data.where.location_from.access_alert_importance)}
                
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'where'} onLayout={this.onLayout('where')} style={[styles.slideView, {height: this.state.slideAnimation['where']}]}>
                    { data.where &&
                      <View style={styles.slideBox}>
                      {this.displayText(data.where.location_from.no +' '+ data.where.location_from.street+' '+data.where.location_from.apartment+data.where.location_from.entry_number+' '+data.where.location_from.building)}
                      {this.displayAlert(data.where.location_from.access_alert_id, data.where.location_from.access_alert_importance)}
                      {this.displayText(data.where.location_to.no +' '+ data.where.location_to.street+' '+data.where.location_to.apartment+' '+data.where.location_to.entry_number+data.where.location_to.building)}
                      {this.displayAlert(data.where.location_to.access_alert_id, data.where.location_to.access_alert_importance)}
                      {this.displayText(data.where.cargo_detail)}
                      {this.displayText(data.where.cargo_note)}
                      {this.displayText(data.where.location_notes)}
                      </View>
                    }
                </Animated.View>
              </View>

              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('when')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='clock-o'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  WHEN</Text>
                  </View>
                  
                  <Text style={styles.value}> {data.when? data.when.date : '--'}</Text>
                  { data.when && this.getArrowIcon('when', data.when.details.time_alert_importance)}
                
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'when'} onLayout={this.onLayout('when')} style={[styles.slideView, {height: this.state.slideAnimation['when']}]}>
                    { data.when &&
                      <View style={styles.slideBox}>
                        {this.displayText(data.when.date)}
                        {this.displayText(data.when.time)}
                        {this.displayText(data.when.details.time_range? 'Time Range '+data.when.details.time_range:'')}
                        {this.displayText(data.when.details.time_detail)}
                        {this.displayAlert(data.when.details.time_alert_id, data.when.details.time_alert_importance)}
                        {this.displayText(data.when.note)}
                      </View>
                    }
                </Animated.View>
              </View>

              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('how')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='truck'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  HOW</Text>
                  </View>
                  
                  <Text style={styles.value}> {data.how && data.how.truck.truck? data.how.truck.truck.description : '--'}</Text>
                  { data.how && this.getArrowIcon('how', data.how.truck.equipment_alert_importance)}
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'how'} onLayout={this.onLayout('how')} style={[styles.slideView, {height: this.state.slideAnimation['how']}]}>
                    { data.how &&
                      <View style={styles.slideBox}>
                        {this.displayText(data.how.truck.equipment_details)}
                        {this.displayAlert(data.how.truck.equipment_alert_id, data.how.truck.equipment_alert_importance)}
                        {this.displayText((data.how.truck.number_man_id? data.how.truck.number_man_id+'Men ':''))}
                        {this.displayText((data.how.truck.user? data.how.truck.user.name:''))}
                        {this.displayText((data.how.truck.mover2? data.how.truck.mover2.name:''))}
                        {this.displayText((data.how.truck.mover3? data.how.truck.mover3.name:''))}
                        {this.displayText((data.how.truck.mover4? data.how.truck.mover4.name:''))}
                        {this.displayText((data.how.truck.mover5? data.how.truck.mover5.name:''))}
                        {this.displayText((data.how.truck.mover6? data.how.truck.mover6.name:''))}
                        
                      </View>
                    }
                </Animated.View>
              </View>

              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this.onPressArrow('cost')}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='dollar'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  HOW MUCH</Text>
                  </View>
                  
                  <Text style={styles.value}> {data.how_much? data.how_much.start_time+'-'+data.how_much.move_time: '--'}</Text>
                  {this.getArrowIcon('cost')}
                </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <Animated.View ref={'cost'} onLayout={this.onLayout('cost')} style={[styles.slideView, {height: this.state.slideAnimation['cost']}]}>
                    { data.how_much &&
                      <View style={styles.box}>
                        {/* Hourly Cost */}
                        <View style={styles.sectionRow}>
                          <View style={styles.sectionHeading}>
                            <Text style={styles.heading}>Hourly Cost</Text>
                          </View>
                          <View style={styles.sectionBody}>
                            <View style={styles.sectionFieldBox}>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelText
                                  label="Start"
                                  value={this.state.start}
                                  onPress={() => this.setState({ startTimePickerVisible: true })}
                                  onChangeText={(text) => this.setState({['start']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                {/*<FloatingLabelInput
                                  label="Start"
                                  value={this.state.start}
                                  onFocus={() => this.setState({ startTimePickerVisible: true })}
                                  onChangeText={(text) => this.setState({['start']: text})}
                                  Boxstyle={{ flex: 1}}
                                />*/}
                                <FloatingLabelInput
                                  label="Stop"
                                  value={this.state.stop}
                                  onFocus={() => this.setState({ stopTimePickerVisible: true })}
                                  onChangeText={(text) => this.setState({['stop']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelText
                                  label="Hours"
                                  value={this.getHours()}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Break"
                                  onChangeText={(text) => this.setState({ break: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                            </View>
                            <View style={styles.sectionTotal}>

                                <Text style={styles.totalText}>Move Cost</Text>
                                <View style={styles.wrapVal}>
                                <Text ref="movetotal" style={styles.totalVal}>0</Text>
                                </View>

                            </View> 
                          </View>
                        </View> 
                        {/* Flat Rate */}
                        <View style={styles.sectionRow}>
                          <View style={styles.sectionHeading}>
                            <Text style={styles.heading}>Flat Rate</Text>
                          </View>
                          <View style={styles.sectionBody}>
                            <View style={styles.sectionFieldBox}>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelInput
                                  label="Flat Rate"
                                  type="number"
                                  onChangeText={(text) => this.setState({ flatrate: text})}
                                  value={this.state.flatrate}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                            </View>
                            <View style={styles.sectionTotal}>

                                <Text style={styles.totalText}>Flat Rate</Text>
                                <View style={styles.wrapVal}>
                                <Text ref="flatrate" style={styles.totalVal}>{this.state.flatrate.toString()}</Text>
                                </View>

                            </View> 
                          </View>
                        </View> 
                        {/* Packing Cost */}
                        <View style={styles.sectionRow}>
                          <View style={styles.sectionHeading}>
                            <Text style={styles.heading}>Packing</Text>
                          </View>
                          <View style={styles.sectionBody}>
                            <View style={styles.sectionFieldBox}>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelInput
                                  label="Boxes"
                                  onChange={(text) => this.setState({['boxes']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Paper"
                                  onChange={(text) => this.setState({['paper']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Tape"
                                  onChange={(text) => this.setState({['tape']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Wrap"
                                  onChange={(text) => this.setState({['wrap']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelInput
                                  label="Bags"
                                  onChange={(text) => this.setState({['bags']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Box Rent"
                                  onChange={(text) => this.setState({['boxrent']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Other"
                                  onChange={(text) => this.setState({['other']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelInput
                                  label="Packing Notes"
                                  onChange={(text) => this.setState({['packingNotes']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                            </View>
                            <View style={styles.sectionTotal}>

                                <Text style={styles.totalText}>Packing Cost</Text>
                                <View style={styles.wrapVal}>
                                <Text ref="packingtotal" style={styles.totalVal}>{this.getPackingTotal()}</Text>
                                </View>

                            </View> 
                          </View>
                        </View>  
                        {/* Total Cost */}
                        <View style={styles.sectionRow}>
                          <View style={styles.sectionHeading}>
                            <Text style={styles.heading}>Total Cost</Text>
                          </View>
                          <View style={styles.sectionBody}>
                            <View style={styles.sectionFieldBox}>
                              <View style={styles.sectionFieldRow}>
                                <FloatingLabelInput
                                  label="GST/HST"
                                  onChange={(text) => this.setState({['gst']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="PST"
                                  onChange={(text) => this.setState({['pst']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Subtotal"
                                  onChange={(text) => this.setState({['subtotal']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Deposit"
                                  onChange={(text) => this.setState({['deposit']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Payment"
                                  onChange={(text) => this.setState({['payment']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                                <FloatingLabelInput
                                  label="Balance Due"
                                  onChange={(text) => this.setState({['due']: text})}
                                  Boxstyle={{ flex: 1}}
                                />
                              </View>
                            </View>
                            <View style={styles.sectionTotal}>

                                <Text style={styles.totalText}>Total Cost</Text>
                                <View style={styles.wrapVal}>
                                <Text ref="totalcost" style={styles.totalVal}>0</Text>
                                </View>

                            </View> 
                          </View>
                        </View>   
                        {/*<TouchableOpacity onPress={() => this.openModal()} style={styles.goButton}>
                          <Text style={styles.goButtonText}>{'Contract'}</Text>
                        </TouchableOpacity>*/}
                      </View>
                    }
                </Animated.View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <View><Icon
                      name='address-card'
                      type='font-awesome'
                      color='#234885'
                      size={18}
                    /></View>
                    <Text style={styles.label}>  CONTACT LOG</Text>
                  </View>
                </View>
              </View>
              <ScrollView>
              <List>
                {
                  list.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.from}
                      subtitle={item.message}
                      leftIcon={{name: 'message'}}
                      hideChevron={true}
                    />
                  ))
                }
              </List>
              </ScrollView>
            </View>
            
          </View>
        </ScrollView>
      <View style={styles.buttonGroup}>
          <TextInput
            autoCorrect={false}
            autoFocus={false}
            placeholder={'Enter message'}
            style={styles.textInput}
            onChangeText={(text) => this.setState({['message']: text})}
            value={this.state['message']}
            underlineColorAndroid='transparent'
            placeholderTextColor={'#777'}
            containerStyle={styles.textContainer}
          />
          <Icon
          name='file-o'
          type='font-awesome'
          size={18}
          color='#fff'
          iconStyle={{ paddingLeft: 10}}
          onPress={() => navigate('DrawerOpen')} />
      </View>
      <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>This is content inside of modal component</Text>
                <Button
                    onPress={() => this.closeModal()}
                    title="Close modal"
                >
                </Button>
              </View>
            </View>
          </Modal>
          <DateTimePicker
            mode='time'
            isVisible={this.state.startTimePickerVisible}
            onConfirm={this._handleDatePicked('start')}
            onCancel={() => this.setState({startTimePickerVisible: false})}
          />
          <DateTimePicker
            mode='time'
            isVisible={this.state.stopTimePickerVisible}
            onConfirm={this._handleDatePicked('stop')}
            onCancel={() => this.setState({stopTimePickerVisible: false})}
          />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {move: state.movedetail}
}

const MoveDetailScreen = connect(
  mapStateToProps
)(App)

export default MoveDetailScreen;
