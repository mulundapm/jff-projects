import './App.css';
import './currencyInput.css'
import CurrencyInput from './currencyInput';
import { useState , useEffect} from 'react';
import axios from 'axios';

function App() {
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('EUR')
  const [rates, setRate] = useState('')
  
  useEffect (() =>{
    axios.get('https://api.currencybeacon.com/v1/latest?api_key='+process.env.REACT_APP_API_KEY)
    .then(response => {
      setRate(response.data.rates)
    })
  }, []);
  
  useEffect ( ()=>{
    if (!!rates){
      handleAmount1Change(1)
    }
  },[rates])
  
  
  function format(number){
    return number.toFixed(4)
  }
  
  function handleAmount1Change(amount1){
    setAmount2(format(amount1 * rates[currency2] /rates[currency1]))
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1){
    setCurrency1(currency1);
    setAmount2(format(amount1 * rates[currency2] /rates[currency1]))
  }
  
  function handleAmount2Change(amount2){
    setAmount1(format(amount2 * rates[currency1] /rates[currency2]))
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2){
    setCurrency2(currency2);
    setAmount1(format(amount2 * rates[currency1] /rates[currency2]))
  }
  

  return(  
  <div>
    <h1>Currency Converter</h1>
    <CurrencyInput currencies={Object.keys(rates)} amount={amount1} currency={currency1} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change} />
    <CurrencyInput currencies={Object.keys(rates)} amount={amount2} currency={currency2} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change}/>
  </div>
  )
}

export default App;
