/**
 * Created by MingYin Lv on 2017/2/24 下午10:05.
 */
import { connect } from 'react-redux';
import ListComponent from '../components/ListComponent';
import { loadArticleList } from '../modules/article';

const mapDispatchToProps = {
  loadArticleList,
};

const mapStateToProps = state => ({
  dataSource: state.article.get('list'),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
