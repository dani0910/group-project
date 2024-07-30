import React from "react";
import { Header, MenuBar } from "./main";
import "./css/foodSearch.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FoodSearch = () => {
  //css 개판으로 해놔서 수정해야함
  const base_url =
    "http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1";
  const service_key =
    "F0ujwILUgFVtwYhJG8RKhlh0Zne1fV7drPAZN1CbFqshZ4o%2BfztKpNhGadkKL%2FKCGIaHfw8iPJ7K4%2FU8CgnDBg%3D%3D";
  const url_with_service_key = `${base_url}?ServiceKey=${service_key}&type=json`;

  const query_by_food_name = async (food_name) => {
    const url_with_food_name = `${url_with_service_key}&desc_kor=${food_name}`;
    let result_json = await fetch(url_with_food_name)
      .then((res) => res.json())
      .then((json) => json.body);

    return result_json;
  };
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const getFood = (e) => setFood(e.target.value);
  const [foods, setfoods] = useState([]);
  const locaion = useLocation();
  const time = locaion.state?.time || "";

  const onsubmit = (e) => {
    e.preventDefault();
    query_by_food_name(food).then((data) => {
      if (data) {
        console.log(data);
        if (data.items && data.items.length > 0) {
          setfoods(data.items);
        } else {
          console.log("no item foound");
        }
      } else {
        console.log("No data received");
      }
    });
  };

  return (
    <>
      <Header />
      <main class="main foodMain">
        <section id="foodSearchSection">
          <h4 className="prevBtnFood">&lt; 아침</h4>
          <div className="searchContainer">
            <form onSubmit={onsubmit}>
              <input type="text" placeholder="음식 검색" onChange={getFood} />
              <button className="searchBtn" type="submit">
                <span class="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
          <div className="resultContainer">
            <div className="tabs">
              <button className="allBtn">전체</button>
              <button className="bookmarkBtn">즐겨찾기</button>
              <button className="selfAddBtn">직접 추가</button>
            </div>
            <form>
              <ul
                className="foodResultBox"
                onSubmit={onselect}
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: "20px 0",
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                }}
              >
                {foods &&
                  foods.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="foodName" style={{ flex: 1 }}>
                        <p className="foodTxt">{item.DESC_KOR}</p>
                        <p className="gram"> (100g)</p>
                      </div>
                      <p className="foodKcal">{item.NUTR_CONT1} kcal</p>
                      <button
                        className="addBtn "
                        type="button"
                        onClick={() => {
                          const temp_foodinfo = {
                            name: item.DESC_KOR,
                            time: time,
                            calories: item.NUTR_CONT1,
                            carb: item.NUTR_CONT2,
                            protein: item.NUTR_CONT3,
                            fat: item.NUTR_CONT4,
                          };
                          console.log(temp_foodinfo);
                          navigate("/home/food_ingredient", {
                            state: { foodinfo: temp_foodinfo },
                          });
                        }}
                      >
                        추가
                      </button>
                    </li>
                  ))}
              </ul>
            </form>
          </div>
        </section>
      </main>
      <MenuBar />
    </>
  );
};

export default FoodSearch;