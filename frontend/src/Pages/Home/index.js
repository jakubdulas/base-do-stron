import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";

export default function Home() {
  const [data, setData] = useState([]);
  let api = useAxios();

  const getData = async () => {
    let response = await api.get("api/home/");

    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>This is home view</h1>
      <ul>
        {data.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
