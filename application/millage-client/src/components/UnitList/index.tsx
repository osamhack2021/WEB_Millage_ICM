import {getUnitListAsync} from '@modules/Unit/actions';
import {UnitObject} from '@modules/Unit/types';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CSS from 'csstype';
import './unit.css';
import {useHistory, useLocation} from 'react-router-dom';
import {REGISTER_PATH, ROOT_PATH} from '@constants';

export default function UnitList() {
  const location = useLocation();
  const history = useHistory();
  const page = location.pathname;
  let containerStyle: CSS.Properties = {
    height: '100%',
  };
  if (page === REGISTER_PATH) {
    containerStyle = {
      margin: '50px auto 0 auto',
      width: '480px',
      height: '100%',
      border: '1px solid #e3e3e3',
      borderRadius: '20px',
    };
  }
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [unitId, setUnitId] = useState(-1);
  const [unitList, setUnitList] = useState([]);
  const unit = useSelector((state: any) => state.unit);
  const units = unit.units;

  const goRegisterUser = () => {
    if (unitId != -1) {
      history.push({
        pathname: '/register/user',
        state: {
          unitId: unitId,
        },
      });
    } else {
      alert('부대를 선택해주세요!');
    }
  };

  useEffect(() => {
    dispatch(getUnitListAsync.request());
  }, [dispatch]);

  useEffect(() => {
    setUnitList(units);
  }, [unit]);

  useEffect(() => {
    if (keyword == '') {
      setUnitList(units);
    } else {
      setUnitList(units.filter((unit: UnitObject) => {
        return unit.name.includes(keyword);
      }));
    }
  }, [keyword]);

  const renderUnitList = () => {
    return unitList.map((u: UnitObject) => {
      if (page===ROOT_PATH) {
        return (
          <div className="unit">
            <span className="name">{u.name}</span>
            <span className="count">{u.count}명</span>
          </div>
        );
      } else if (page===REGISTER_PATH) {
        return (
          <a className="link" onClick={()=>{
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
  if (page===REGISTER_PATH) {
    button = (
      <div className="nextButton">
        <button onClick={()=>{
          goRegisterUser();
        }}>다음</button>
      </div>
    );
  }
  ;
  return (
    <div id="UnitListContainer" style={containerStyle}>
      <div className="search">
        <div className="searchText">
          <img src='img/searchUnitText.png'/>
          <input id="searchUnit" type="text"
            placeholder="찾으시는 부대를 검색하세요"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}/>
        </div>
      </div>
      <div className="list">
        {renderUnitList()}
      </div>
      {button}
    </div>
  );
};
