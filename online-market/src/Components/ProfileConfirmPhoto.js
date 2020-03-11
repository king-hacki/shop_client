import React, {Component} from 'react'

import {Modal, Button, Image, Header, Container, Input} from 'semantic-ui-react'

import styled from 'styled-components'

import {toast} from 'react-toastify'

import {savePhoto} from '../Actions/userActions'

import {connect} from 'react-redux'

const StyledInput = styled(Input)`
    margin-top:20px;
`

class ProfileConfirmPhoto extends Component {

    state = {
        image: null,
        displayImage: null
    }

    onChange = e => {
        if(e.target.files[0] != null){
            if(e.target.files[0].type != "image/png" && e.target.files[0].type != "image/jpeg"){
                toast.error("You selected not 'png' type, try again", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }else{
                this.setState({
                    image: e.target.files[0],
                    displayImage: URL.createObjectURL(e.target.files[0])
                    })
                }
            }
        }

    savePhoto = () => {
        this.props.savePhoto(this.state.image);
    }

    render(){
        return (
            <Container>
                <StyledInput fluid accept="image/png" type="file" onChange={this.onChange}></StyledInput>
                <br/>
                <Modal 
                size="large" trigger={<Button disabled={this.state.image === null} primary>Preview account's photo</Button>}>
                <Modal.Header>Preview</Modal.Header>
                    <Modal.Content image>
                    <Image size="massive" src={this.state.displayImage} />
                    </Modal.Content>
                </Modal>
                <Button onClick={this.savePhoto}  positive>Save without preview</Button>
            </Container>
        )
    }
}

export default connect(null,{savePhoto})(ProfileConfirmPhoto);