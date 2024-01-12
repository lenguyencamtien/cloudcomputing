import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Web3 from 'web3';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const connectButtonRef = useRef();
    const [connected, setConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState('');

    // Kiểm tra trạng thái kết nối trong localStorage khi trang web khởi chạy
    useEffect(() => {
        const isConnected = localStorage.getItem('isConnected');
        if (isConnected === 'true') {
            setConnected(true);
            setAccountAddress(localStorage.getItem('accountAddress'));
        }
    }, []);
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                if (connected) {
                    setConnected(false); // Đặt trạng thái kết nối thành false
                    console.log('Ngắt kết nối ví thành công.');
                    localStorage.removeItem('isConnected');
                    localStorage.removeItem('accountAddress');
                    setAccountAddress('');
                } else {
                    // Nếu chưa kết nối, thì yêu cầu kết nối
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const web3 = new Web3(window.ethereum);

                    const accounts = await web3.eth.getAccounts();
                    if (accounts.length > 0) {
                        console.log('Ví MetaMask đã được kết nối.');
                        setConnected(true);
                        setAccountAddress(accounts[0]);
                        localStorage.setItem('isConnected', 'true');
                        localStorage.setItem('accountAddress', accounts[0]);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi kết nối ví MetaMask:', error);
            }
        } else {
            console.log('Vui lòng cài đặt MetaMask trước khi kết nối.');
        }
    };

    const buttonText = connected ? 'Ngắt kết nối' : 'Kết nối ví';

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div></div>
                <div className={cx('right')}>
                    <div className={cx('address-metamask')}>
                        <p>{accountAddress}</p>
                    </div>
                    <button type="button" className={cx('connect')} ref={connectButtonRef} onClick={connectWallet}>
                        {buttonText}
                    </button>
                    <div className={cx('avatar')}></div>
                </div>
            </div>
        </header>
    );
}

export default Header;
