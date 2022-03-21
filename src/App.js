import logo from './logo-light.svg';
import './App.css';
import {useState} from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import {createERC20, createFreeport} from "@cere/freeport-sdk";
import {ethers} from "ethers";

function App() {
    const [account, setAccount] = useState();
    const [contracts, setContracts] = useState();

    const onClickLogin = async (e) => {
        e.preventDefault();

        const torus = new Torus({
            buttonPosition: 'top-right',
        });
        await torus.init({
            whiteLabel: {
                theme: {
                    isDark: true,
                    colors: {
                        torusBrand1: '#B70F93',
                    }
                },
                logoDark: 'https://cere.network/assets/images/header/logo-light.svg',
                logoLight: 'https://cere.network/assets/images/header/logo-light.svg',
                disclaimerHide: true,
            },
            network: {
                host: 'mumbai',
                chainId: 80001,
                networkName: 'Polygon Testnet'
            },
        });
        await torus.login();

        const web3 = new Web3(torus.provider);
        const address = (await web3.eth.getAccounts())[0];
        const balance = await web3.eth.getBalance(address);
        setAccount({address, balance});

        const provider = new ethers.providers.Web3Provider(torus.provider)
        const erc20 = await createERC20({
            signer: provider.getSigner(),
            contractAddress: '0x4e5a86E128f8Fb652169f6652e2Cd17aAe409e96'
        });
        const freeport = createFreeport({
            signer: provider.getSigner(),
            contractAddress: '0x702BA959B5542B2Bf88a1C5924F73Ed97482c64B'
        });
        setContracts({freeport, erc20});
    };

    const onClickBuy = async (e) => {
        e.preventDefault();
        await contracts.erc20.approve(contracts.freeport.address, '50000000');
        await contracts.freeport.takeOffer(
            account.address,
            '0x325ec461f77fa260851c2e582c23f157be54b041',
            BigInt('22783081436715926951418794946865374550317546867850358514859376679352637849900'),
            BigInt('50000000'),
            BigInt('1'),
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                {account ? (
                    <div className="App-info">
                        <p>
                            <strong>Address</strong>: {account.address}
                        </p>
                        <p>
                            <strong>Balance</strong>: {account.balance}
                        </p>
                        <a className="App-link" onClick={onClickBuy}>
                            Buy NFT
                        </a>
                    </div>
                ) : (
                    <>
                        <p>You didn't login yet. Login to see your account details.</p>
                        <a className="App-link" onClick={onClickLogin}>
                            Login
                        </a>
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
