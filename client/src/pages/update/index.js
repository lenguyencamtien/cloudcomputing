import classNames from 'classnames/bind';
import styles from './update.module.scss';
import { useState, useRef, useEffect } from 'react';
import productApi from '~/api/product';
import { useNavigate, useParams } from 'react-router-dom';
// import Web3 from 'web3';
// import { contractABI, contractAddress } from '~/config/contractConfig';

const cx = classNames.bind(styles);

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

function UpdateProduct() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        size: [],
        quantity: 0,
        color: [],
        desc: '',
        thumbnail: null,
    });
    const inputRef = useRef(null);

    useEffect(() => {
        productApi
            .getProductById(_id)
            .then((productInfo) => {
                setProduct({
                    name: productInfo.product.name,
                    price: productInfo.product.price,
                    quantity: productInfo.product.quantity,
                    desc: productInfo.product.desc,
                    size: productInfo.product.size,
                    color: productInfo.product.color,
                    transactionId: productInfo.product.transactionId,
                    thumbnail: productInfo.product.thumbnail,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [_id]);

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

            const response = await productApi.updateProduct(_id, formData);
            // setTimeout(() => {
            //     navigate('/list-product');
            // }, 3000);

            console.log('Product created:', response);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1>Cập nhật sản phẩm</h1>
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
                                        const isChecked = product.size.includes(size.size);
                                        return (
                                            <label key={index} className={cx('color-label')}>
                                                <div className={cx('checkbox-color')}>
                                                    <input
                                                        type="checkbox"
                                                        id="size"
                                                        name="size"
                                                        value={size.size}
                                                        checked={isChecked}
                                                        onChange={(event) => handleSizesChange(event, size.size)}
                                                    />
                                                </div>
                                                <div className={cx('size-checkbox', isChecked ? 'selected' : '')}>
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
                                        const isChecked = product.color.includes(color.color);
                                        return (
                                            <label key={index} className={cx('color-label')}>
                                                <div className={cx('checkbox-color')}>
                                                    <input
                                                        type="checkbox"
                                                        id="color"
                                                        name="color"
                                                        value={color.color}
                                                        checked={isChecked}
                                                        onChange={(event) => handleColorsChange(event, color.color)}
                                                    />
                                                </div>
                                                <div className={cx('custom-checkbox', isChecked ? 'selected' : '')}>
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
                                {product.thumbnail && (
                                    <div
                                        className={cx('image')}
                                        id="image-preview"
                                        onClick={handleImageChange}
                                        style={{
                                            backgroundImage: `url(http://localhost:3000/uploads/${product.thumbnail.public_id})`,
                                        }}
                                    >
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
                                )}
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
                                    {product.thumbnail && (
                                        <div
                                            className={cx('image-1')}
                                            id="image-preview-1"
                                            style={{
                                                backgroundImage: `url(http://localhost:3000/uploads/${product.thumbnail.public_id})`,
                                            }}
                                        ></div>
                                    )}
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

export default UpdateProduct;
