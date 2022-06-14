import React from 'react';
import PropTypes, { object } from 'prop-types';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';

const ConfirmModal =  props => {
    const { onCancel, className, onOk, visible, title, type, color, footer, width, children } = props;
  return (
    <ModalStyled
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    type={color ? type : false}
    width={width}
    className={className}
    footer={
      footer || footer === null
        ? footer
        : [
            <Button type="secondary" key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button type={type} key="submit" onClick={onOk}>
              Save 
            </Button>,
          ]
    }
  >
    {children}
  </ModalStyled>
  )
}

export default ConfirmModal