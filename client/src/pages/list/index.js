import classNames from 'classnames/bind';
import styles from './list.module.scss';
import productApi from '~/api/product';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Web3 from 'web3';
// import { contractABI, contractAddress } from '~/config/contractConfig';

const URL = 'http://localhost:3000';

const cx = classNames.bind(styles);

function ListProduct() {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        const getProductsList = async () => {
            try {
                const data = await productApi.fetchProducts();
                setProductsList(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductsList();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h1>Danh sách sản phẩm</h1>
                    <ToastContainer position="bottom-left" />
                </div>
                <div className={cx('manage')}>
                    <div className={cx('list', 'left')}>
                        <div className={cx('tag')}>
                            <div className={cx('head')}>
                                <h5>#</h5>
                                <h5>Tên sản phẩm</h5>
                                <h5>Hình ảnh</h5>
                                <h5>Giá sản phẩm</h5>
                                <h5>Số lượng</h5>
                                <h5>Kích thước</h5>
                                <h5>Màu sắc</h5>
                                <h5>Tùy chọn</h5>
                            </div>
                        </div>
                        <div className={cx('product')}>
                            {productsList.map((product, index) => {
                                return (
                                    <div className={cx('list-product')} key={index}>
                                        <h5>{index + 1}</h5>
                                        <h5>{product.name}</h5>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                alt="hinh anh"
                                                src={`${URL}/uploads/${product.thumbnail.public_id}`}
                                            ></img>
                                        </div>
                                        <h5>{Number(product.price).toLocaleString()} VND</h5>
                                        <h5>{product.quantity}</h5>
                                        <h5>{product.size.join(' - ')}</h5>
                                        <div className={cx('colors')}>
                                            {product.color.map((hex, index) => {
                                                return (
                                                    <div key={index} className={cx('circle-list')}>
                                                        <div
                                                            className={cx('circle')}
                                                            style={{ backgroundColor: hex }}
                                                        ></div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('options')}>
                                            <a href={`http://localhost:3000/update-product/${product._id}`}>
                                                <button className={cx('edit')} type="button">
                                                    Sửa
                                                </button>
                                            </a>
                                            <button
                                                className={cx('delete')}
                                                type="button"
                                                onClick={async () => {
                                                    if (
                                                        window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')
                                                    ) {
                                                        try {
                                                            await productApi.deleteProduct(product._id);
                                                            const updatedProducts = productsList.filter(
                                                                (r) => r._id !== product._id,
                                                            );
                                                            toast.success('Xóa sản phẩm thành công');
                                                            setProductsList(updatedProducts);
                                                        } catch (error) {
                                                            console.log(error.message);
                                                        }
                                                    }
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* <div className={cx('parameter', 'right')}>
                        <div className={cx('statistical')}>
                            <div className={cx('top')}>
                                <div className={cx('block', 'block-1')}></div>
                                <div className={cx('block', 'block-2')}></div>
                            </div>
                            <div className={cx('bot')}>
                                <div className={cx('block', 'block-3')}></div>
                                <div className={cx('block', 'block-4')}></div>
                            </div>
                        </div>
                        <div className={cx('chart')}></div>
                        <div className={cx('buttons')}>
                            <div className={cx('choose')}></div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
