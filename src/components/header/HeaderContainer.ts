import { connect } from 'react-redux';
import withRouter from '../../routes/withRouter';
import Header from './Header';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
