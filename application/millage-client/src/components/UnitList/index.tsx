import {getUnitListAsync} from '@modules/Unit/actions';
import {UnitObject} from '@modules/Unit/types';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CSS from 'csstype';
import './unit.css';
import {useHistory, useLocation} from 'react-router-dom';
import {UNITSELECT_PATH, ROOT_PATH,
  SIGNUP_PATH, ADMIN_UNITSELECT_PATH} from '@constants';

interface UnitListState{
  roleId: number;
}

export default function UnitList() {
  const location = useLocation<UnitListState>();
  const history = useHistory();
  const page = location.pathname;
  let containerStyle: CSS.Properties = {
    flex: '0 1 70%',
  };

  let unitListStyle: CSS.Properties = {
    overflowY: 'auto',
    flex: '1 1 85%',
    borderBottom: '1px solid #e3e3e3',
    height: '520px',
  };
  if (page === UNITSELECT_PATH || page == ADMIN_UNITSELECT_PATH) {
    containerStyle = {
      margin: '50px auto 0 auto',
      width: '480px',
      height: '100%',
      border: '1px solid #e3e3e3',
      borderRadius: '20px',
    };

    unitListStyle = {
      overflowY: 'auto',
      flex: '1 1 85%',
      borderBottom: '1px solid #e3e3e3',
    };
  }


  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [unitId, setUnitId] = useState(-1);
  const [unitList, setUnitList] = useState<UnitObject[]>([]);
  const unit = useSelector((state: any) => state.unit);
  const units = unit.units;

  const goRegisterUser = () => {
    if (page == ADMIN_UNITSELECT_PATH) {
      if (keyword == '') {
        alert('부대명을 입력해주세요');
      } else if (unitId == -1 &&
          unitList.length == 1 && keyword == unitList[0].name) {
        const c = confirm(`${keyword}에 가입하시겠습니까?`);
        if (c) {
          history.push({
            pathname: SIGNUP_PATH,
            state: {
              unitId: unitList[0].id,
              roleId: location.state.roleId,
              unitName: keyword,
            },
          });
        }
      } else {
        let c;
        if (unitId == -1) {
          c = confirm(`${keyword} 커뮤니티를 새롭게 생성하시겠습니까?`);
        } else {
          c = confirm(`${keyword}에 가입하시겠습니까?`);
        }
        if (c) {
          history.push({
            pathname: SIGNUP_PATH,
            state: {
              unitId: unitId,
              roleId: location.state.roleId,
              unitName: keyword,
            },
          });
        } else {
          setUnitId(-1);
        }
      }
    } else {
      if (unitId != -1) {
        history.push({
          pathname: SIGNUP_PATH,
          state: {
            unitId: unitId,
            roleId: location.state.roleId,
            unitName: keyword,
          },
        });
      } else {
        alert('부대를 선택해주세요!');
      }
    }
  };

  useEffect(() => {
    dispatch(getUnitListAsync.request());
  }, [dispatch]);

  useEffect(() => {
    setUnitList(units);
  }, [unit]);

  useEffect(() => {
    if (keyword === '') {
      setUnitList(units);
    } else {
      setUnitList(units.filter((unit: UnitObject) => {
        return unit.name.includes(keyword);
      }));
    }
  }, [keyword]);

  useEffect(() => {
    setUnitList([]);
  }, [unitId]);

  const renderUnitList = () => {
    return unitList.map((u: UnitObject) => {
      if (page===ROOT_PATH) {
        return (
          <div className="unit" key={u.id}>
            <span className="name">{u.name}</span>
            <span className="count">{u.count}명</span>
          </div>
        );
      } else if (page===UNITSELECT_PATH || page === ADMIN_UNITSELECT_PATH) {
        return (
          <a className="link" key={u.id} onClick={()=>{
            setKeyword(u.name);
            setUnitId(u.id);
          }}>
            <span className="name">{u.name}</span>
            <span className="count">{u.count}명</span>
          </a>
        );
      }
    });
  };

  let button;
  if (page===UNITSELECT_PATH || ADMIN_UNITSELECT_PATH) {
    button = (
      <div className="nextButton">
        <button onClick={()=>{
          goRegisterUser();
        }}>다음</button>
      </div>
    );
  }

  return (
    <div id="UnitListContainer" style={containerStyle}>
      <div className="search">
        <div className="searchText">
          <img src='/img/searchUnitText.png'/>
          <input id="searchUnit" type="text"
            placeholder="찾으시는 부대를 검색하세요"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}/>
        </div>
      </div>
      <div className="list" style={unitListStyle}>
        {renderUnitList()}
      </div>
      {button}
    </div>
  );
};
