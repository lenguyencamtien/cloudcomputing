import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow, BiSolidFoodMenu } from 'react-icons/bi';
import { MdArrowDropDown } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const sidebarClassName = cx('left', 'right', {
        'sidebar-open': isSidebarOpen,
        'sidebar-closed': !isSidebarOpen,
    });

    const buttonClassName = cx('toggle', {
        'toggle-open': isSidebarOpen,
        'toggle-closed': !isSidebarOpen,
    });

    return (
        <main className={cx('wrapper')}>
            <div className={cx('button', sidebarClassName)}>
                <div className={cx('logo')}>
                    <h1>B</h1>
                </div>
                <div className={cx('name')}>
                    <h2 className={cx('blockchain')}>Blockchain</h2>
                    <button type="button" className={buttonClassName} onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                            <BiSolidLeftArrow className={cx('icons-white')} />
                        ) : (
                            <BiSolidRightArrow className={cx('icons-white')} />
                        )}
                    </button>
                </div>
            </div>
            <div className={cx('menu', sidebarClassName)}>
                <div className={cx('dropdown')}>
                    <i className={cx('icons-black', 'icon-btn')}>
                        <BiSolidFoodMenu />
                    </i>
                    <div className={cx('tag', 'tag-dropdown')}>
                        <p>Quản lý sản phẩm</p>
                        <MdArrowDropDown />
                    </div>
                </div>
                <div className={cx('tab')}>
                    <a href="http://localhost:3000/add-product" className={cx('add')}>
                        <i className={cx('icons-black', 'icon-btn-dot')}>
                            <GoDotFill />
                        </i>
                        <div className={cx('tag')}>
                            <p>Thêm sản phẩm</p>
                        </div>
                    </a>
                </div>
                <div className={cx('tab')}>
                    <a href="http://localhost:3000/list-product" className={cx('add')}>
                        <i className={cx('icons-black', 'icon-btn-dot')}>
                            <GoDotFill />
                        </i>
                        <div className={cx('tag')}>
                            <p>Danh sách sản phẩm</p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    );
}

export default Sidebar;
