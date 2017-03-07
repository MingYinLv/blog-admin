/**
 * Created by MingYin Lv on 2017/2/28 下午9:07.
 */
import { connect } from 'react-redux';
import AddComponent from '../components/AddComponent';
import { addArticle } from '../modules/article';
import { loadTypeList } from '../../Type/modules/type';

const mapDispatchToProps = {
  loadTypeList,
  addArticle,
};

const mapStateToProps = state => ({
  typeList: state.cache.get('typeList'),
  addBtnDisable: state.article.get('addBtnDisable'),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddComponent);
