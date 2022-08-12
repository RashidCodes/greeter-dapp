import { EthProvider } from "./contexts/EthContext";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import { useEffect, useState } from 'react';
import Contract from 'web3-eth-contract';
import GreeterContract from "./contracts/Greeter.json"



function App() {

  const [state, setState] = useState({web3: null, accounts: null, contract: null});
  const [greeting, setGreeting] = useState('');


  useEffect(() => {

    const init = async () => {
      try {

        // Get network provider and web3 instance 
        const web3 = await getWeb3();


        // use web3 to get the user's accounts 
        const accounts = await web3.eth.getAccounts();


        // get the contract instance 
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = GreeterContract.networks[networkId]
        const instance = new web3.eth.Contract(
          GreeterContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        const greeting = await instance.methods.greet().call({from: accounts[0]})
        
        setGreeting(greeting);

        setState({web3, accounts, contract: instance});
      } catch (err) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details`
        );

        console.error(err);
      }
    }

    init();

    
  }, [])


  const formSubmitHandler = async (e) => {
    //e.preventDefault();
    state.contract.methods.setGreeting(greeting).send({from: state.accounts[0]})
    .on("receipt", (hash) => {
      console.log(hash)
    })

    
  }

  
  return (
    <EthProvider>
      <div id="App" >
        <h1>Greeter Contract</h1>
        <p>{greeting}</p>

        <div style={{display: 'flex'}}>
          <p style={{margin: '0 10px 0 0'}}>New Greeting: </p>
          <input style={{margin: '0 10px 0 0', width: '250px'}} type="text" value={greeting} onChange={e => setGreeting(e.target.value)}/>
          <button style={{padding: '0 10px 0 10px'}} onClick={formSubmitHandler}>Submit</button>
        </div>
      </div>
    </EthProvider>
  );

}

export default App;
