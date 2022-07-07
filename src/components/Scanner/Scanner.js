import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './ScannerStyle';
import {QrReader} from 'react-qr-reader';
import {useDispatch} from 'react-redux';
import {SwpQcsReq} from 'redux/actions/ScannerAction';



const Reader = ({setUsername}) => {
  return(
    <QrReader
      onResult={(result) => {
        if(result?.text) {
          console.log('바코드 스캔완료');
          setUsername(result.text);
        }
      }}
      containerStyle={{width: '50%'}}
    />
  );
};


export const Scanner = () => {
  const [username, setUsername] = useState('');
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    if(username !== '') {
      dispatch(SwpQcsReq(username));
      setUsername('');
      setFlag(true);

      if(flag) {
        timer = setTimeout(() => {
          dispatch(SwpQcsReq(username));
          setUsername('');
        }, [3000]);
      }
    }
    return () => {
      clearTimeout(timer);
      setFlag(false);
    };
  }, [username]);



  return (
    <Container>
      <Reader setUsername={setUsername}/>
    </Container>

  );
};

const {
  Container
} = style;

Reader.propTypes = {
  setUsername: PropTypes.func.isRequired,
};