import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ItemList from './item-list';
import Item from '../../models/item';

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.getItems = this.getItems.bind(this);
    this.getUserItems = this.getUserItems.bind(this);
    this.getItemsFromApi = this.getItemsFromApi.bind(this);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname === '/items') {
      this.getItems();
    }
    if (pathname === '/items/user') {
      this.getUserItems();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pathname } = this.props.location;
    const { pathname: prevPathname } = prevProps.location;
    if (pathname !== prevPathname) {
      if (pathname === '/items') {
        this.getItems();        
      }
      else if (pathname === '/items/user') {
        this.getUserItems();
      }
    }
  }

  getItems() {
    this.getItemsFromApi('http://localhost:3000/items');
  }

  getUserItems() {
    const { authUserId } = this.props;
    this.getItemsFromApi(`http://localhost:3000/items/user/${authUserId}`);
  }

  getItemsFromApi(apiUrl) {
    axios.get(apiUrl)
    .then(response => {
      const { items: itemsApi } = response.data;
      const items = itemsApi.map(item => {
        return new Item(item._id, item.headline);
      });
      this.setState({
        items,
      });
    })
    .catch(error => console.log(error));
  }

  render() {
    const { items } = this.state;
    const { authUserId, isAuthenticated} = this.props;

    return <Switch>
      <Route path="/items" render={() => <ItemList items={items} />} />
      <Route path="/items/user" render={() => <ItemList items={items} />} />
    </Switch>;
  }
}

ItemsContainer.propTypes = {
  authUserId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(ItemsContainer);

