import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Manga from './Manga';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<Manga/>, document.getElementById('root'));
registerServiceWorker();
