import React, { Component } from 'react';
import Header from './Header.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <section id="content">
        <div class="head">
          <div id="content" class="container">
            <div class="hidden-xs col-xs-12 col-md-6">
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="header-text-container">
                <h1>于是我们奋力向前，逆流向上，不断的挣扎，直至回到往昔的岁月。</h1>
                <h4>——菲茨杰拉德 《了不起的盖茨比》</h4>
              </div>
            </div>
          </div>
        </div>

        <section id = 'display-title'>
          <div class='title'>
            <h4 class='text-center'>书籍推荐</h4>
          </div>
        </section>

        <section id = 'display'>
          <div class = 'container-fluid'>
            
          </div>

        </section>
      </section>

    );
  }
}

export default App;
