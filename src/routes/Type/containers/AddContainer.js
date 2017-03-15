/**
 * Created by MingYin Lv on 2017/2/28 下午9:07.
 */
import { connect } from 'react-redux';
import AddComponent from '../components/AddComponent';
import { addType, editType } from '../modules/type';

const mapDispatchToProps = {
  addType,
  editType,
};

const mapStateToProps = state => ({
  addBtnDisable: state.type.get('addBtnDisable'),
  list: state.type.get('list'),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddComponent);
