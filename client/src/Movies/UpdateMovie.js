import React, { useState, useEffect } from "react";
import axios from "axios";

// const initialMovie = {
//   id: Number(props.match.params.id),
//   title: "",
//   director: "",
//   metascore: null,
//   stars: ""
// };

const UpdateMovie = props => {
  console.log(`THIS IS PROPS UPDATEMOVIE`, props);
  const [movie, setMovie] = useState({
    // id: Number(props.match.params.id),
    // title: "",
    // director: "",
    // metascore: "",
    // stars: ""
    ...props.update
  });
  // console.log(`this is movie`, movie);

  useEffect(() => {
    const movieToEdit = props.update.find(
      movie => `${movie.id}` === props.match.params.id
    );

    if (movieToEdit) setMovie(movieToEdit);
  }, [props.update, props.match.params.id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.value === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newMovie = {
      ...movie,
      stars: movie.stars.split(",")
    };

    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, newMovie)
      .then(res => {
        props.setUpdate(res.data);
        props.history.push(`/movies${props.match.params.id}`);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          placeholder="metascore"
          onChange={changeHandler}
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          placeholder="stars"
          onChange={changeHandler}
          value={movie.stars}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
