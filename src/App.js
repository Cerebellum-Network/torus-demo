import logo from './logo-light.svg';
import './App.css';
import {useState} from "react";
import CustomAuth from "@toruslabs/customauth";
import TorusEmbed from "@toruslabs/torus-embed";
import Web3 from "web3";
import {createERC20, createFreeport} from "@cere/freeport-sdk";
import {ethers} from "ethers";

function App() {
    const [account, setAccount] = useState();
    const [contracts, setContracts] = useState();

    const onClickLogin = async (e) => {
        e.preventDefault();

        const torus = new CustomAuth({
            baseUrl: "http://localhost:3000/serviceworker",
            network: "testnet",
        });
        await torus.init();

        // service to create jwt token
        // https://dinochiesa.github.io/jwt/

        /// header
        // {
        //     "alg": "RS256",
        //     "typ": "JWT"
        // }

        /// payload
        // {
        //     "iss": "https://cere.network",
        //     "email": "some-email-address-torus-test",
        //     "aud": "test-cere-jwt-v3",
        //     "iat": 1649935128,
        //     "exp": 1649935728
        // }

        // private key
        // -----BEGIN PRIVATE KEY-----
        // MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfYELRiGcKOoyi
        // b3U5Y8q+DcujHeG/EoalpisrroQ4Staq5Gq1h+g6S15Kp8JficCPmLxnKVdush4c
        // IGFq4eFlYLdHRvcMyy0rUyoPfoAo1Gc8QhP8zlnKVf43OKg2g7Ai7SuNMQgOR2DQ
        // zUSHoiSb6vwhMmSfXRB7YBsPpIV26IHIcWC2ONd4nbD13/q7GW5ANl8vHsjVmK9B
        // iyiCzjQnFFkO10HNGaJAbs/W8XWo467/ArMmzRNj9YsxuTWQ5diDKdBVYTAw/Wh7
        // PQM2fd+DrdkJWOJCem38L/2e7L72iFW/kS8iuXAJCtrs2/IpudI56KsT3VMVFx52
        // GjZMjSGrAgMBAAECggEAPwtgkytOe0za2dyWNewERLcHUVCePquw6LD5Tc+8jNoJ
        // 3dL6ZTHMStcKhySibpF6wzLrgDFp3SeHYp/qeVG+DBC8n2zyiDSM+yDsN/HV95DB
        // /6Ox7WShPzlSFP0MCXiBQeeovTLimWdh5Gb2j2Kz8Zt8PhOFm0bAoNVNDxyJERZa
        // 3V2mdoyt2SHsG8rdmg0uGirYi3Lh4FqqUmL3T5+i2hxR2ewtSMn8wrXvvWKBV+tu
        // 1pzB54V5iYhYpmDVEsVGh5Jwfjw6KNzXhUsxTfdsQGtwj6jGGSZ8ajtdGHWjX2Na
        // MEI6Ax3a/8OM3OXezQ5iFBpvyMGtihkh3hGKxsuTEQKBgQDdMiQS16gj9Be36yql
        // NQpUAyRC7Mjrg0fAk3msuIVN6KS5Mhexbv1UEMKYYe9YBKGaYZxpELvkghB/eknA
        // oD/LsUHqjyfx/+7VW0ZCXYY54GT6sKjnGbDqgFs2lyYjxGUlZBoxXxznnlOZuaDK
        // 11LggVCbxurMmeNwDOPS8GBH0QKBgQC4c/3h80qFl3mzcmTwb5TDADo9Vj5omopM
        // ZYFVc0Su3kxF4CKU7Nk5p40bQZ4DLELsGlhG38bJHMJ8rCiTZJr1KpJ+lKPRbKgM
        // 6issQSUChF/hy/U7EKW2Nqe9dV6JfXIUAWwJk3F/SpUpHGm4qQwHwH+mejQ+i5ty
        // Qux3eMTsuwKBgQCekSRFEa4qYABky0Pd/ODzivECvQXnt0vHpLDz/a8qQ51aWauc
        // eelGy2EEpihTG7bRminrM6DOVeMHz51xZi91kROk140WMZeAAZejWbIwaUlaYSwj
        // x0oJQYyh3Mbtmwu7O0B/piRtchWSPP0kjCmQYYNsuLN3itX9bHAhtkn/EQKBgEyU
        // U56gjJsENZHL955fJQsEqClZChYRu0NWjSi175kOT+pe0Ny1rMYkCxB64Kh+ktZF
        // ZcsfEv/iQdjS/RGcnj0VTLbi7VSAYRDjk8MO1NfDr68mJ407LyGEdYXSGcrJWzh1
        // Eq6zGVb41w63biktfgIl6JlseQ5SldoNcPF1IYULAoGAZO5b89RYIiLMadUDbs4S
        // KqF8foH4K2CCs0A2gQWFjqyznVNruRxHGjzOaRy4HJncv/sEhrf5NjG9YZ1pXTev
        // 2HRMhnr+Xajnskvd+wuPs924ZJ1tkKD9VTyEJpK8fbVerHOsgZjDnK6O9JnU/fxg
        // R80JKcFUdExVe6aUWKMbars=
        // -----END PRIVATE KEY-----

        // public key
        // -----BEGIN PUBLIC KEY-----
        //     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn2BC0YhnCjqMom91OWPK
        // vg3Lox3hvxKGpaYrK66EOErWquRqtYfoOkteSqfCX4nAj5i8ZylXbrIeHCBhauHh
        // ZWC3R0b3DMstK1MqD36AKNRnPEIT/M5ZylX+NzioNoOwIu0rjTEIDkdg0M1Eh6Ik
        // m+r8ITJkn10Qe2AbD6SFduiByHFgtjjXeJ2w9d/6uxluQDZfLx7I1ZivQYsogs40
        // JxRZDtdBzRmiQG7P1vF1qOOu/wKzJs0TY/WLMbk1kOXYgynQVWEwMP1oez0DNn3f
        // g63ZCVjiQnpt/C/9nuy+9ohVv5EvIrlwCQra7NvyKbnSOeirE91TFRcedho2TI0h
        // qwIDAQAB
        // -----END PUBLIC KEY-----

        // paster token from https://dinochiesa.github.io/jwt/ here
        let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2NlcmUubmV0d29yayIsImVtYWlsIjoic29tZS1lbWFpbC1hZGRyZXNzLXRvcnVzLXRlc3QiLCJhdWQiOiJ0ZXN0LWNlcmUtand0LXYzIiwiaWF0IjoxNjQ5OTM1MTI4LCJleHAiOjE2NDk5MzU3Mjh9.avtLHnlxtZpjbrhsMOL2phFRrdo0ko7aUkkMmjKP7ls58YFtOiGSrCgl0CTc2x1R64utJi3KMoc1Z9xHI2d2fWvpRVNkvzML21kBgTqyc5gVLEEG4D2qmrPCf0iFFWMXwj_j-gCh09XNtNdP7wvcKpwPRdCjig6TVrvjFDCquVn5nkKKeMBlGE9BQ_lV73D--Ejd3H_Kmtt507PpBBz5-RiTwb12otmXQEKzqrqzzmNez5vx51BOKnPOaTmB5iO0x-g57O7jBelXeQE4GhD74Q8VNRqXu7JC3I2lkQYoOqcOOb91kTVZQn43TyxarC1u9bA4A57eBCuT1LTHuCUZrw"

        // should be the same email as in jwt token
        let email = "some-email-address-torus-test";

        // verifier should be deployed here
        // https://dashboard.web3auth.io/home/customauth
        // it refers to jwt endpoint which provides public key to verify jwt token (this service is used currently https://beeceptor.com/console/validation)
        // this service generates jwk json by public key
        // https://russelldavies.github.io/jwk-creator/
        // example:
        // {
        //     "kty": "RSA",
        //     "n": "n2BC0YhnCjqMom91OWPKvg3Lox3hvxKGpaYrK66EOErWquRqtYfoOkteSqfCX4nAj5i8ZylXbrIeHCBhauHhZWC3R0b3DMstK1MqD36AKNRnPEIT_M5ZylX-NzioNoOwIu0rjTEIDkdg0M1Eh6Ikm-r8ITJkn10Qe2AbD6SFduiByHFgtjjXeJ2w9d_6uxluQDZfLx7I1ZivQYsogs40JxRZDtdBzRmiQG7P1vF1qOOu_wKzJs0TY_WLMbk1kOXYgynQVWEwMP1oez0DNn3fg63ZCVjiQnpt_C_9nuy-9ohVv5EvIrlwCQra7NvyKbnSOeirE91TFRcedho2TI0hqw",
        //     "e": "AQAB",
        //     "alg": "RS256",
        //     "kid": "test-cere-jwt-v3",
        //     "use": "sig"
        // }

        let verifier = "test-cere-jwt-v3";
        const torusKey = await torus.getTorusKey(
            verifier,
            email,
            {verifier_id: email},
            token
        );
        console.log(torusKey)
        console.log("publicAddress:" + torusKey.publicAddress)
        console.log("privateKey:" + torusKey.privateKey)

        const torusEmbed = new TorusEmbed({
            buttonPosition: 'top-right',
        })
        await torusEmbed.init({
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

        // jwt token should be new (<1 minute lifespan) and can be used only once.
        // so the jwt provider has to support refresh token to handle page refreshes/etc.
        // but maybe we can save keys somewhere (not sure is it safe or not, because refresh token also gives access to keys, but it's usually saved somewhere)
        await torusEmbed.loginWithPrivateKey({
            privateKey: torusKey.privateKey, userInfo: {
                email: email,
                verifier: verifier,
                verifierId: email,
                typeOfLogin: "jwt",
            }
        });

        const web3 = new Web3(torusEmbed.provider);
        const address = (await web3.eth.getAccounts())[0];
        const balance = await web3.eth.getBalance(address);
        setAccount({address, balance});

        const provider = new ethers.providers.Web3Provider(torusEmbed.provider)
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
