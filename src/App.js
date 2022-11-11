import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import { useFetch } from "./useFetch";
import axios from "axios";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const {
    loading,
    data: photos,
    error,
    setData: setPhotos,
    setLoading,
    setError,
  } = useFetch(`${mainUrl}${clientID}`);
  const [page, setPage] = React.useState(1);

  async function fetchPhotos() {
    const url = `${mainUrl}${clientID}&page=${page}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      setPhotos((data) => {
        return [...data, ...response.data];
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }

  React.useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // console.log(`innerHeight: ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);
      let scrollTime =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

      if (scrollTime) {
        setPage((p) => p + 1);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  React.useEffect(() => {
    fetchPhotos();
  }, [page]);

  if (error) {
    console.log(error);
    return <h2>error</h2>;
  }
  if (!photos) {
    return null;
  }
  return (
    <>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => (
            <Photo key={index} {...photo} />
          ))}
        </div>
        {loading && <h1>loadign</h1>}
      </section>
    </>
  );
}

export default App;
