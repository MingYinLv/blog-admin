/**
 * Created by MingYin Lv on 2017/2/24 下午10:05.
 */
import { connect } from 'react-redux';
import ListComponent from '../components/ListComponent';
import { loadArticleList, deleteArticleById } from '../modules/article';
import { loadTypeList } from '../../Type/modules/type';

const mapDispatchToProps = {
  loadArticleList,
  deleteArticleById,
  loadTypeList,
};

const mapStateToProps = state => ({
  dataSource: state.article.get('list'),
  typeList: state.cache.get('typeList'),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
