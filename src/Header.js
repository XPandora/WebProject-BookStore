import React, { Component } from 'react';
import Collection from './fonts/collection.png'
import ShoppingCart from './fonts/shoppingCart.png'
import User from './fonts/user.png'
import BookStore from './fonts/BookStore.png'
import Login from "./Login.js"
import {Link} from 'react-router-dom'
import "../src/css/bootstrap.min.css"
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-default navbar-fixed-top">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <img src={BookStore} id = "headertitle"/>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav">
                                <li class="active"><Link to="/">首页</Link></li>
                                <li><Link to="/Table">书库</Link></li>
                                <li><a href="#contact">关于</a></li>
                                <li>
                                    <input type = "search" class = "form-control" id = "headerSearch" placeholder = "search"/>
                                </li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li><img src={User} class = "headerlogo"/></li>
                                <li><img src={Collection} class = "headerlogo"/></li>
                                <li><img src={ShoppingCart} class = "headerlogo"/></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;