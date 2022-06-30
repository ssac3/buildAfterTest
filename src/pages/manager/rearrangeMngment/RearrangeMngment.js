import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './RearrangeMngmentStyle';
import {MdOutlineClose} from 'react-icons/md';
import Dropbox from 'components/Dropbox';
import {MANAGER_APPROVAL_TYPE} from 'utils/constants';
import theme from 'styles/theme';
import {cnvrtDate, cnvrtTime} from 'utils/convertDateTime';
import {useDispatch} from 'react-redux';
import {SwpRarReq} from 'redux/actions/ManagerAction';

export const RearrangeMngment = ({onClickATR, atvDetail}) => {
  let [startHour, startMin, endHour, endMin] = [0, 0, 0, 0];
  const dispatch = useDispatch();
  const [openDrop, setOpenDrop] = useState(false);
  const [change, setChange] = useState(MANAGER_APPROVAL_TYPE[atvDetail?.approvalFlag]?.title);

  if(atvDetail.startTime !== null && atvDetail.endTime !== null) {
    const startTime = atvDetail.startTime.split(':');
    const endTime = atvDetail.endTime.split(':');
    startHour = Number(startTime[0]);
    startMin = Number(startTime[1]);
    endHour = Number(endTime[0]);
    endMin = Number(endTime[1]);
  }
  const resultStartTime = cnvrtTime(new Date(
    0,
    0,
    0,
    startHour,
    startMin,
  )).replace('00:00', '--:--');
  const resultEndTime = cnvrtTime(new Date(
    0,
    0,
    0,
    endHour,
    endMin,
  )).replace('00:00', '--:--');
  const onClickDropbox = () => {
    setOpenDrop(!openDrop);
  };

  const onClickDropBoxItem = (e) => {
    setChange(e.target.id);
    onClickDropbox();
  };

  const onClickRARSubmit = () => {
    const data = {
      ...atvDetail,
      approvalFlag:
        MANAGER_APPROVAL_TYPE.filter((v) => v.title === change)[0].id};
    console.log(data);
    dispatch(SwpRarReq(data, onClickATR));
  };
  return (
    <Wrap>
      <Container>
        <UserInfoWrap>
          <CloseLayout>
            <MdOutlineClose size={25} onClick={() => onClickATR(0)} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <UserInfoLayout>
            <ProfileLayout/>
            <UserDetailInfoLayout>
              <ItemLayout>
                <h3>사원번호</h3>
                <h2>{atvDetail.username}</h2>
              </ItemLayout>
              <ItemLayout>
                <h3>사원명</h3>
                <h2>{atvDetail.name}</h2>
              </ItemLayout>
            </UserDetailInfoLayout>
          </UserInfoLayout>
        </UserInfoWrap>
        <AtvInfoLayout>
          <AtmItemLayout>
            <ItemLabel>조정 요청 일자</ItemLabel>
            <h3>{cnvrtDate(new Date(atvDetail?.rStartTime))}</h3>
          </AtmItemLayout>
          <AtmItemLayout>
            <ItemLabel>조정 요청 사유</ItemLabel>
            <h3>{atvDetail?.contents}</h3>
          </AtmItemLayout>
          <AtmItemLayout>
            <ItemLabel>조정 요청 시간</ItemLabel>
            <h3>
              {cnvrtTime(new Date(atvDetail?.rStartTime))
                .concat('~')
                .concat(cnvrtTime(new Date(atvDetail?.rEndTime)))}
            </h3>
          </AtmItemLayout>
          <AtmItemLayout>
            <ItemLabel>기존 근태 시간</ItemLabel>
            <h3>
              {resultStartTime.concat(' ~ ').concat(resultEndTime)}
            </h3>
          </AtmItemLayout>
          <AtmItemLayout>
            <ItemLabel>상태</ItemLabel>
            <DropboxLayout>
              <Dropbox
                open={openDrop}
                onClickDropBox={onClickDropbox}
                menu={MANAGER_APPROVAL_TYPE}
                select={change}
                onClickDropBoxItem={onClickDropBoxItem}
              />
            </DropboxLayout>
          </AtmItemLayout>
        </AtvInfoLayout>

        <BtnLayout>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={() => onClickATR(0)}>취소</Btn>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B} onClick={onClickRARSubmit}>확인</Btn>
        </BtnLayout>
      </Container>
    </Wrap>
  );
};

RearrangeMngment.propTypes = {
  onClickATR: PropTypes.func.isRequired,
  atvDetail: PropTypes.oneOfType([PropTypes.string,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ]).isRequired,
};

const {
  Wrap,
  Container,
  UserInfoWrap,
  UserInfoLayout,
  CloseLayout,
  ProfileLayout,
  UserDetailInfoLayout,
  ItemLayout,
  AtvInfoLayout,
  ItemLabel,
  AtmItemLayout,
  DropboxLayout,
  BtnLayout,
  Btn,
} = style;