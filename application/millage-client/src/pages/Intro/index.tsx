import React, {useEffect} from 'react';
import Login from '@components/Login';
import './intro.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUnitListAsync} from '@modules/Unit/actions';
import {UnitObject} from '@modules/Unit/types';

function Intro() {
  const dispatch = useDispatch();
  const unit = useSelector((state: any) => state.unit);
  const unitList = unit.units;
  useEffect(()=>{
    dispatch(getUnitListAsync.request());
  }, [dispatch]);


  const renderUnitList = () => {
    return unitList.map((u : UnitObject) => {
      return (
        <div className="unit">
          <span className="name">{u.name}</span>
          <span className="count">{u.count}명</span>
        </div>
      );
    });
  };

  return (
    <div id="introContainer">
      <section className="left">
        <div className="wrap">
          <img src='img/introtext.png'/>
        </div>
        <div className="wrap2">
          <img src='img/introduce.png'/>
          <img src='img/symbol.png'/>
        </div>
      </section>
      <section className="rightbar">
        <Login />
        <div className="search">
          <div className="searchText">
            <img src='img/searchUnitText.png'/>
            <input id="searchUnit" type="text" placeholder="찾으시는 부대를 검색하세요"/>
          </div>
        </div>
        <div className="list">
          {renderUnitList()}
        </div>
      </section>
    </div>
  );
}


export default Intro;
