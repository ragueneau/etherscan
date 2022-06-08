import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import * as serviceWorker from './serviceWorker';


//change website title
document.title = "CoeptIX Etherscan";

//change website favicon
let link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://etherscan.io/images/favicon.ico';
document.getElementsByTagName('head')[0].appendChild(link);

const rootElement = document.getElementById("root");
render( <App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();