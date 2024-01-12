import classNames from 'classnames/bind';
import styles from './add.module.scss';
import { useState, useRef } from 'react';
import productApi from '~/api/product';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Web3 from 'web3';
// import { contractABI, contractAddress } from '~/config/contractConfig';

const cx = classNames.bind(styles);

function AddProduct() {
    const navigate = useNavigate();
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };
    const handleThumbnailChange = (event) => {
        setProduct({
            ...product,
            thumbnail: event.target.files[0],
        });
    };
    const handleFileImage = (event) => {
        handleFileSelected(event);
        handleThumbnailChange(event);
    };
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        size: [],
        quantity: 0,
        color: [],
        desc: '',
        thumbnail: null,
    });
    const handleImageChange = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    const handleFileSelected = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imagePreview = document.getElementById('image-preview');
                const imagePreview1 = document.getElementById('image-preview-1');
                if (imagePreview && imagePreview1) {
                    imagePreview.style.backgroundImage = `url(${event.target.result})`;
                    imagePreview1.style.backgroundImage = `url(${event.target.result})`;
                }
            };

            reader.readAsDataURL(file);
        }
    };
    const menuColor = [
        { title: 'White', color: '#fff' },
        { title: 'Black', color: '#000' },
        { title: 'Yellow', color: '#ffff00' },
        { title: 'Blue', color: '#0000ff' },
        { title: 'Green', color: '#008000' },
        { title: 'Gray', color: '#808080' },
        { title: 'Aqua', color: '#00ffff' },
        { title: 'Red', color: '#ff0000' },
    ];
    const menuSize = [
        { title: 'Smail', size: 'S' },
        { title: 'Medium', size: 'M' },
        { title: 'Large', size: 'L' },
        { title: 'Extra Large', size: 'XL' },
        { title: 'Double Extra', size: '2XL' },
        { title: 'Triple Extra', size: '3XL' },
        { title: 'Fourfold Extra', size: '4XL' },
    ];
    const handleColorsChange = (event, color) => {
        const { checked, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            color: prevProduct.color.includes(value)
                ? prevProduct.color.filter((color) => color !== value)
                : [...prevProduct.color, value],
        }));
        if (checked) {
            setSelectedColors([...selectedColors, color]);
        } else {
            setSelectedColors(selectedColors.filter((title) => title !== color));
        }

        setProduct((prevProduct) => ({
            ...prevProduct,
            title: selectedColors,
        }));
    };
    const handleSizesChange = (event, size) => {
        const { checked, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            size: prevProduct.size.includes(value)
                ? prevProduct.size.filter((size) => size !== value)
                : [...prevProduct.size, value],
        }));
        if (checked) {
            setSelectedSizes([...selectedSizes, size]);
        } else {
            setSelectedSizes(selectedSizes.filter((title) => title !== size));
        }

        setProduct((prevProduct) => ({
            ...prevProduct,
            title: selectedSizes,
        }));
    };
    // const web3 = new Web3(window.ethereum);
    // const contract = new web3.eth.Contract(contractABI, contractAddress);
    // const addProductToSmartContract = async () => {
    //     try {
    //         // Lấy tài khoản MetaMask của người dùng (đã đăng nhập)
    //         const accounts = await web3.eth.requestAccounts();
    //         const account = accounts[0]; // Lấy tài khoản đầu tiên

    //         // Gọi chức năng addProduct trên hợp đồng
    //         await contract.methods
    //             .addProduct(product.name, product.price, product.quantity, product.size, product.color, product.desc)
    //             .send({ from: account });

    //         console.log('Sản phẩm đã được thêm vào smart contract');
    //     } catch (error) {
    //         console.error('Lỗi khi thêm sản phẩm vào smart contract:', error);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('size', JSON.stringify(product.size));
            formData.append('quantity', product.quantity);
            formData.append('color', JSON.stringify(product.color));
            formData.append('desc', product.desc);
            formData.append('thumbnail', product.thumbnail);

            // await addProductToSmartContract(product);
            const response = await productApi
                .createProduct(formData)
                .then((response) => {
                    toast.success('Thêm sản phẩm thành công');
                    setTimeout(() => {
                        navigate('/list-product');
                    }, 3000);
                })
                .catch((error) => {
                    toast.danger(`Lỗi khi thêm sản phẩm ${error}`);
                });

            console.log('Product created:', response);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1>Thêm sản phẩm</h1>
                <ToastContainer position="bottom-left" />
            </div>

            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('left')}>
                    <div className={cx('top')}>
                        <div className={cx('inputs')}>
                            <div className={cx('form-control')}>
                                <label htmlFor="name">Tên sản phẩm</label>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="price">Giá sản phẩm</label>
                                <div className={cx('input')}>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="quantity">Số lượng</label>
                                <div className={cx('input')}>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="size">Kích cỡ</label>
                                <div className={cx('checkbox')}>
                                    {menuSize.map((size, index) => {
                                        return (
                                            <label key={index} className={cx('color-label')}>
                                                <div className={cx('checkbox-color')}>
                                                    <input
                                                        type="checkbox"
                                                        id="size"
                                                        name="size"
                                                        value={size.size}
                                                        checked={selectedSizes.includes(size.size)}
                                                        onChange={(event) => handleSizesChange(event, size.size)}
                                                    />
                                                </div>
                                                <div
                                                    className={cx(
                                                        'size-checkbox',
                                                        selectedSizes.includes(size.size) ? 'selected' : '',
                                                    )}
                                                >
                                                    {size.size}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="color">Màu sắc</label>
                                <div className={cx('checkbox')}>
                                    {menuColor.map((color, index) => {
                                        return (
                                            <label key={index} className={cx('color-label')}>
                                                <div className={cx('checkbox-color')}>
                                                    <input
                                                        type="checkbox"
                                                        id="color"
                                                        name="color"
                                                        value={color.color}
                                                        checked={selectedColors.includes(color.color)}
                                                        onChange={(event) => handleColorsChange(event, color.color)}
                                                    />
                                                </div>
                                                <div
                                                    className={cx(
                                                        'custom-checkbox',
                                                        selectedColors.includes(color.color) ? 'selected' : '',
                                                    )}
                                                >
                                                    <div
                                                        className={cx('color-display')}
                                                        style={{ backgroundColor: color.color }}
                                                    ></div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={cx('thumbnail')}>
                            <label htmlFor="img">Hình ảnh</label>
                            <div className={cx('frame')}>
                                <div className={cx('image')} id="image-preview" onClick={handleImageChange}>
                                    <input
                                        type="file"
                                        id="img"
                                        ref={inputRef}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        name="thumbnail"
                                        onChange={(event) => handleFileImage(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('desc', 'bot')}>
                        <label htmlFor="desc">Mô tả</label>
                        <div className={cx('content')}>
                            <textarea
                                id="desc"
                                name="desc"
                                value={product.desc}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={cx('right')}>
                        <div className={cx('review')}>
                            <label>Review</label>
                            <div className={cx('card')}>
                                <div className={cx('thumb')}>
                                    <div className={cx('image-1')} id="image-preview-1"></div>
                                </div>
                                <div className={cx('info')}>
                                    <div className={cx('name-clt')}>
                                        <h2>{product.name === '' ? 'Tên sản phẩm' : product.name}</h2>
                                    </div>
                                    <div className={cx('double')}>
                                        <div className={cx('price-clt')}>
                                            <h4>Giá tiền</h4>
                                            <p>{product.price === 0 ? '0' : product.price} VNĐ</p>
                                        </div>
                                        <div className={cx('color-clt')}>
                                            <h4 className={cx('color')}>Màu sắc</h4>
                                            <div className={cx('list')}>
                                                {product.color.map((hex, index) => (
                                                    <div key={index} className={cx('color-border')}>
                                                        <div
                                                            className={cx('color-display')}
                                                            style={{ backgroundColor: hex }}
                                                        ></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('size-clt')}>
                                        <h4>Kích cỡ</h4>
                                        <p>{product.size.length === 0 ? 'S - M - L' : product.size.join(' - ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('option')}>
                            <label>Options</label>
                            <div className={cx('buttons')}>
                                <button type="submit" className={cx('submit')}>
                                    <p>Xác nhận</p>
                                </button>
                                <button type="button" className={cx('cancel')}>
                                    <p>Đặt lại</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
