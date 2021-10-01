import {getUnitListAsync} from '@modules/Unit/actions';
import {UnitObject} from '@modules/Unit/types';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function UnitList() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [unitList, setUnitList] = useState([]);
  const unit = useSelector((state: any) => state.unit);
  const units = unit.units;
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
      return (
        <div className="unit">
          <span className="name">{u.name}</span>
          <span className="count">{u.count}명</span>
        </div>
      );
    });
  };
  return (
    <>
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
    </>
  );
}


export default UnitList;
