import classNames from 'classnames/bind';
import styles from './main.module.scss';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

const cx = classNames.bind(styles);

function Main({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar className={cx('left')} />
                <div className={cx('right')}>
                    <Header className={cx('header')} />
                    <div className={cx('content')}>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
