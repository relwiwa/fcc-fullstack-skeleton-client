import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { isStringOrNull, isTrueFalseOrNull } from '../../services/prop-types-service';
import { getToken } from '../../services/auth-service';
import DisplayItem from './display-item';
import Item from '../../models/item';
import ItemList from './item-list';
import ItemListItem from '../../models/item-list-item';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      currentItem: null,
    };
    this.getItem = this.getItem.bind(this);
    this.getItemList = this.getItemList.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.getItem(id);
    }
    if (this.props.match.url === '/items') {
      this.getItemList();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;
    if (id && id !== prevId) {
      this.getItem(id);
    }
    if (this.props.match.url === '/items' && this.state.itemList.length === 0) {
      this.getItemList();
    }
  }

  getItem(itemId) {
    axios.get(`http://localhost:3000/item/${itemId}`)
    .then(response => {
      const { item } = response.data;
      this.setState({
        currentItem: new Item(item._id, item.headline, item.content, item.creator),
        itemList: [],
      });
    })
    .catch(error => console.log(error));
  }

  getItemList() {
    axios.get('http://localhost:3000/items')
    .then(response => {
      const { items } = response.data;
      const itemList = items.map(item => {
        return new ItemListItem(item._id, item.headline);
      });
      this.setState({
        currentItem: null,
        itemList,
      });
    })
    .catch(error => console.log(error));
  }

  handleDeleteItem() {
    const { currentItem } = this.state;
    const { history } = this.props;
    axios.delete(
      `http://localhost:3000/item/${currentItem.id}`,
      { data: { jwtToken: getToken() } },
    )
    .then(response => {
      this.setState({
        currentItem: null,
      });
      history.push('/items');
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { currentItem, itemList } = this.state;
    const { authUserId, isAuthenticated} = this.props;

    return <Switch>
      { currentItem !== null && <Route path="/item/:id/display" render={() => <DisplayItem
        authUserOwnsItem={(isAuthenticated && authUserId === currentItem.creator) ? true : false}
        item={currentItem}
        onDeleteItem={this.handleDeleteItem}
      />} />}
      <Route path="/items" render={() => <ItemList items={itemList} />} />
    </Switch>;
  }
}

ItemContainer.propTypes = {
  authUserId: isStringOrNull,
  isAuthenticated: isTrueFalseOrNull, 
};

export default withRouter(ItemContainer);

