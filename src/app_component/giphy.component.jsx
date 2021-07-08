import React,{useEffect, useState} from 'react';
import axios from "axios";

const Giphy = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(()=>{
        const display = async () => {
              const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                  api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
                  limit: 100
                }
              });
              // console.log(results);
              setData(results.data.data);
            };

            display();
        },[]);

        const renderGifs = () => {
            return data.map(el => {
                return (
                    <div key={el.id} className="gif">
                        <img src={el.images.fixed_height.url} />
                        </div>
                );
            });
        };

        const searchFunc = event => {
            setSearch(event.target.value);
        };

        const submitHandle = async event => {
            event.preventDefault();
                const results = await axios("https://api.giphy.com/v1/gifs/search", {
                    params: {
                      api_key: "iVfUcb3NZ7DFne4FMleqDQmv3JR1EmAs",
                      q: search
            }
        });
        setData(results.data.data);
        };

        return (
            <div className="m-2">
              <div className="container gifs">{renderGifs()}</div>
              <form className="form-inline justify-content-center m-2">
                <div class="wrap">
                  <div class="search">
                    <input type="text" placeholder="search" class="searchTerm" onChange={searchFunc} value={search} />
                    <button type="submit" class="searchButton" onClick={submitHandle}>Go</button>
                  </div>
                </div>
              </form>
            </div>
        )
};

export default Giphy;