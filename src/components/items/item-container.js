import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AddItem from './add-item';
import DisplayItem from './display-item';
import EditItem from './edit-item';
import Item from '../../models/item';
import { getToken } from '../../services/auth-service';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null,
    };
    this.getItem = this.getItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleAddOrEditItem = this.handleAddOrEditItem.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.getItem(id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;
    if (id && id !== prevId) {
      this.getItem(id);
    }
    if (id === prevId && !prevProps.match.url.startsWith('/item/display/')) {
      this.getItem(id);
    }
  }
  
  getItem(itemId) {
    axios.get(`http://localhost:3000/item/${itemId}`)
    .then(response => {
      const { item } = response.data;
      this.setState({
        currentItem: new Item(item._id, item.headline, item.content, item.creator),
      });
    })
    .catch(error => console.log(error));
  }
  
  handleAddOrEditItem(itemData) {
    const { history } = this.props;
    this.setState({currentItem: new Item(...itemData)})
    history.push(`/item/display/${itemData._id}`);
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
    const { currentItem } = this.state;
    const { authUserId, isAuthenticated, history } = this.props;

    return <Switch>
      <Route path="/item/add" render={() => <AddItem
        onAddItem={this.handleAddOrEditItem}
      />} />
      { currentItem !== null && <Route path="/item/edit/:id" render={() => <EditItem
        item={currentItem}
        onEditItem={this.handleAddOrEditItem}
      />} />}
      { currentItem !== null && <Route path="/item/display/:id" render={() => <DisplayItem
        authUserOwnsItem={(isAuthenticated && authUserId === currentItem.creator) ? true : false}
        item={currentItem}
        onDeleteItem={this.handleDeleteItem}
        onEditItem={() => history.push(`/item/edit/${currentItem.id}`)}
      />} />}
    </Switch>;
  }
}

ItemContainer.propTypes = {
  authUserId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(ItemContainer);
