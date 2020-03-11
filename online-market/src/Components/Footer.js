import React, { Component } from 'react'
import {Grid, Header, Menu, List, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <Menu inverted secondary style={{height: 80, clear: "both", position: "relative", width: "100%"}} color={'black'} size={'huge'}>
                <Menu.Item as={Link} to="/home" name='Online-market'/>
                <Menu.Item position='right'>
                    <List size='mini' divided relaxed>
                        <List.Item icon="mail" content={
                            <a href='zakharkostyshyn@gmail.com'>zakharkostyshyn@gmail.com</a>}/>
                        <List.Item icon="mail" content={
                            <a href='orest.hlodan28@gmail.com'>orest.hlodan28@gmail.com</a>}/>
                    </List>
                </Menu.Item>
                <Menu.Item position='right'>
                    <List>
                        <List.Item icon="github" content={
                            <a href='https://github.com/king-hacki/shop_client'>Front</a>}/>   
                        <List.Item icon="github" content={
                            <a href='https://github.com/king-hacki/shop'>Back</a>}/>
                    </List>
                </Menu.Item>
            </Menu>
        )
    }
}

export default  connect(null)(Footer);