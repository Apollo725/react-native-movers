export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  rows: {
    flex: 1
  },
  row: {
    // flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  label: {
    fontSize: 14,
    color: '#234885'
  },
  value: {
    fontSize: 14,
    color: '#cd3754',
    marginRight: 5
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginBottom: 30
  },
  divider: {
  	backgroundColor: '#59568f', 
  	marginBottom: 5
  },
  buttonGroup: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#21416e'
  },
  smallButton: {
    backgroundColor: '#7cbcff',
    borderRadius: 4,
    padding: 12,
    elevation: 4, //Android Shadow
    shadowOpacity: 0.3, //IOS Shadow
    shadowRadius: 3,
    shadowOffset: {
        height: 0,
        width: 0
    },
  },
  smallButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  textInput: {
    color: '#50514c',
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
    paddingLeft: 10
  },
  textContainer: {
    color: 'white',
    backgroundColor: 'red'
  },
  slideView: {
    backgroundColor: 'white',
    opacity: 0,
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  slideBox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  slideText: {
    backgroundColor: '#f3f3f3',
    borderRadius: 4,
    padding: 4,
    margin: 2,
    color: '#404040'

  },
  goButton: {
    height: 20
  },
  box: {
    flexDirection: 'column',
    flex: 1
  },
  sectionBody: {
    flexDirection: 'row'
  },
  sectionHeading: {
    padding: 3,
    backgroundColor: '#e9e9e9',
    borderRadius: 4,
  },
  heading: {
    fontSize: 12
  },
  sectionFieldBox: {
    flex: 4,
    flexDirection: 'column'
  },
  sectionFieldRow: {
    flexDirection: 'row'
  },
  sectionRow: {
    flexDirection: 'column',
    marginVertical: 3
  },
  total: {
    flexDirection: 'column'
  },
  totalText: {
    fontSize: 10,
  },
  sectionTotal: {
    flex: 1,
    marginLeft: 5,
    borderLeftWidth: 1, 
    borderLeftColor: '#d0d0d0',
    borderStyle: 'dashed',
    justifyContent: 'center',
        alignItems: 'center',
  },
  totalVal: {
    borderBottomWidth: 1,
  },
  wrapVal: {
    borderBottomWidth: 1,
    padding: 1
  }
};
