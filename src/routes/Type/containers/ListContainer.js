/**
 * Created by MingYin Lv on 2017/3/5 下午9:49.
 */

import { connect } from 'react-redux';
import ListComponent from '../components/ListComponent';
import { loadTypeList } from '../modules/type';

const mapDispatchToProps = {
  loadTypeList,
};

const mapStateToProps = state => ({
  dataSource: state.type.get('list'),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);

